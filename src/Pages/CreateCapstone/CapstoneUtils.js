import {formatEntryUpload} from '../../utils/utils';
import api from '../../Services/api';

export const uploadImage = async (props) => {
  const {
    thumbnail,
    cover,
    media,
    deletedThumbnail,
    deletedCover,
    deletedMedia,
    capstoneId,
  } = props;
  if (capstoneId === '') {
    return;
  }
  // upload thumbnail
  if (thumbnail.length > 0 && !thumbnail[0].id) {
    const thumbnailUpload = formatEntryUpload(thumbnail[0], 'capstones', capstoneId, 'thumbnail');
    await api.uploads.upload(thumbnailUpload);
  }

  if (deletedThumbnail.length > 0) {
    await api.uploads.delete(deletedThumbnail[0]);
  }

  if (cover.length > 0) {
    const newCover = cover.filter(file => !file.id);
    const coverUploads = newCover.map(file => {
      const upload = formatEntryUpload(file, 'capstones', capstoneId, 'cover');
      return api.uploads.upload(upload);
    });
    await Promise.all(coverUploads);
  }

  if (deletedCover.length > 0) {
    const deleted = deletedCover.map(fileId => api.uploads.delete(fileId));
    await Promise.all(deleted);
  }

  if (media.length > 0) {
    const newMedia = media.filter(file => !file.id);
    const mediaUploads = newMedia.map(file => {
      const upload = formatEntryUpload(file, 'capstones', capstoneId, 'media');
      return api.uploads.upload(upload);
    });
    await Promise.all(mediaUploads);
  }

  if (deletedMedia.length > 0) {
    const deleted = deletedMedia.map(fileId => api.uploads.delete(fileId));
    await Promise.all(deleted);
  }
};