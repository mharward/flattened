import React, { useState } from 'react';
import { IconButton, Paper, Popover } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

interface HelpProps {
    children?: React.ReactNode;
}

const Help: React.FC<HelpProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const showPopover = (event: any) => {
        setAnchorEl(!!anchorEl ? null : event.currentTarget);
    };

    const popoverOpen = Boolean(anchorEl);
    const popoverId = popoverOpen ? 'simple-popper' : undefined;

    return (
        <React.Fragment>
            <IconButton
                color="primary"
                onClick={showPopover}
                aria-describedby={popoverId}
            >
                <HelpOutlineIcon></HelpOutlineIcon>
            </IconButton>
            <Popover
                onClose={showPopover}
                id={popoverId}
                anchorEl={anchorEl}
                open={popoverOpen}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Paper style={{ padding: 10, maxWidth: 500 }}>{children}</Paper>
            </Popover>
        </React.Fragment>
    );
};

export default Help;
