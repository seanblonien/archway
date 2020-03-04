import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import AddUser from "./AddUser";

const emails = ['username@gmail.com', 'user02@gmail.com'];
// const useStyles = makeStyles({
//     avatar: {
//         backgroundColor: blue[100],
//         color: blue[600],
//     },
// });

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    return (
        <Dialog
            fullWidth={"lg"}

            onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Add New User</DialogTitle>
            <AddUser/>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

// export default function SimpleDialogDemo() {
//     const [open, setOpen] = React.useState(false);
//     const [selectedValue, setSelectedValue] = React.useState(emails[1]);
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = value => {
//         setOpen(false);
//         setSelectedValue(value);
//     };
//
//     return (
//         <div>
//             <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//             <br />
//             <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//                 Open simple dialog
//             </Button>
//             <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//         </div>
//     );
// }

export default SimpleDialog;
