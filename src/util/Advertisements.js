import {strapi, strapiURL} from "../constants";
import {shuffle} from "d3";

/**
 * This function checks if a user is logged-in, parses the department view records to see
 * which Department's capstones this user views most often, selects a sponsor from that
 * department's sponsors, and then returns the URL to an advertisement for an appropriate sponsor
 * for the user.
 * @returns {Promise<string>}   Promise to retrieve an ad or empty string.
 */
export async function getAdvertisement() {

    let adLink = "";
    let sponsorUrl = null;
    let sponsorName = null;
    // Let's see if we're logged in.
    if(localStorage.getItem("USER") != null) {

        // Step 1:  Let's get the most-viewed department.
        await strapi.axios.get(strapiURL + '/viewstats', {
            params: {
                user: JSON.parse(localStorage.getItem("USER"))._id
            }
        }).then( async response => {
            let maxViews = 0;
            let maxDeptId = null;
            for (let i = 0; i < response.data.length; i++) {
                if (parseInt(response.data[i].count) > maxViews) {
                    maxViews = parseInt(response.data[i].count);
                    maxDeptId = response.data[i].department._id;
                }
            }
            if (maxDeptId == null)
                return await getRandomAd();
            else {
                // Step 2:  Let's get all the Capstones affiliated with the most-viewed Department.
                await strapi.axios.get(strapiURL + '/capstones', {
                    params: {
                        department: maxDeptId
                    }
                }).then(async response => {
                    var sponsorOptions = [];
                    var sponsorId;

                    // Step 3:  Comprise a list of Sponsors that is all the Sponsors for the most-viewed
                    // Department's Capstones.  (dont' add if they exist already)
                    for (var j = 0; j < response.data.length; j++) {
                        if (response.data[j].sponsors != null && response.data[j].sponsors !== []) {
                            for (var k = 0; k < response.data[j].sponsors.length; k++) {
                                if (response.data[j].sponsors[k].isCompany === true) {
                                    if (!sponsorOptions.includes(response.data[j].sponsors[k]._id)) {
                                        sponsorOptions.push(response.data[j].sponsors[k]._id);
                                    }
                                }
                            }
                        }
                    }

                    if (sponsorOptions.length === 0) {
                        return await getRandomAd();
                    }

                    // Step 4:  Pick a random Sponsor from the list of possibilities.
                    sponsorId = sponsorOptions[Math.floor(Math.random() * sponsorOptions.length)];

                    // Step 5:  Now let's get an image URL from the chosen sponsor.
                    await strapi.axios.get(strapiURL + '/sponsors', {
                        params: {
                            _id: sponsorId
                        }
                    }).then(async response => {
                        if (response.data.length > 0) {
                            const numAdverts = response.data[0].adverts.length;
                            if (numAdverts === 0)
                                return await getRandomAd();
                            adLink = strapiURL + response.data[0].adverts[Math.floor(Math.random() * numAdverts)].url;
                            sponsorUrl = response.data[0].webUrl;
                            sponsorName = response.data[0].name;
                            console.log("Returning targeted advertisement from " + sponsorName);
                            return [adLink, sponsorUrl, sponsorName];
                        } else
                            return await getRandomAd();

                    }).catch(async error => {
                        console.log("Error retrieving chosen sponsor.", error);
                        return await getRandomAd();
                    });

                }).catch(async error => {
                    console.log("Error retrieving departments.", error);
                    return await getRandomAd();
                });
            }
        }).catch( error => {
            console.log(error.data);
        });
    }
    if(sponsorUrl !== null)
        return [adLink, sponsorUrl, sponsorName];
    else
        return getRandomAd();
}

/**
 * This function returns the link to a random sponsor's advertisement, or null if no suitable advertisement
 * could be found.
 * @returns {Promise<*>} Promise to load a random advertisement url.
 */
async function getRandomAd() {
    let adUrl = null;
    let sponsorUrl = null;
    let sponsorName = null;

    await strapi.axios.get(strapiURL + '/sponsors', {
        params: {
            _limit: 10
        }
    }).then(response => {

        // If no sponsors were retrieved, then just return an empty string because no sponsors are available.
        if(response.data.length === 0) {
            return [];
        }

        // Shuffle the order of the returned sponsors.
        const sponsorArray = shuffle(response.data);

        for(var i = 0; i < sponsorArray.length && adUrl === null; i++) {
            if(sponsorArray[i].adverts.length > 0) {
                adUrl = strapiURL + sponsorArray[i].adverts[Math.floor(Math.random() * sponsorArray[i].adverts.length)].url;
                sponsorUrl = sponsorArray[i].webUrl;
                sponsorName = sponsorArray[i].name;
            }
        }
    }).catch(error => {
        console.log("We encountered an error while trying to get a random ad link.", error);
        return [];
    });

    return [adUrl, sponsorUrl, sponsorName];
}

/**
 * This function takes a Capstone name and a user's userId token and updates the view count record for each department
 * the capstone belongs to.
 * @param capstoneName The name of the capstone project which has departments that need to have view count updated.
 * @param userId The unique ID of the user to be updated in the view record.
 * @returns {Promise<void>} Promise to update the view count.
 */
export async function updateDeptViewCount(capstoneName, userId) {
    strapi.axios.get(strapiURL + '/capstones', {
        params: {
            CapstoneName:   capstoneName
        }
    }).then(async response => {
        if (response.data.length > 0) {
            const deptId = response.data[0].department._id;
            await strapi.axios.get(strapiURL + '/viewstats', {
                params: {
                    department: deptId,
                    user:   userId
                }
            }).then(async response => {
                if(response.data.length === 0) {
                    await createNewViewCountRecord(userId, deptId);
                } else {
                    const viewStatsId = response.data[0]._id;
                    var newCount = parseInt(response.data[0].count) + 1;

                    await strapi.axios.put(strapiURL + '/viewstats/' + viewStatsId, {
                        count:  '' + newCount
                    }).then(response => {
                        console.log("ViewCount Updated");
                    }).catch(error => {
                        console.log("encountered an error updating viewcount", error);
                    });
                }
            }).catch(async error => {
                await createNewViewCountRecord(userId, deptId);
            });
        }
    }).catch(error => {
        console.log("We encountered an error updating your total.", error);
    });
}

async function createNewViewCountRecord(userId, deptId) {
    strapi.axios.post(strapiURL + '/viewstats', {
        user: userId,
        department: deptId,
        count:  '' + 1
    }).then(response => {
        // console.log("A new record has been created.", JSON.stringify(response.data));
    }).catch(error => {
       console.log("An error occurred creating a new record.", error);
    });
}