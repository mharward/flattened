import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const HeartHouse = React.memo((props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path d="M12 0L0 12H3V22H21V12H24L12 0ZM12 18.5C12 18.5 7 14.5 7 12C7 8 11.427 9.307 12 11C12.574 9.305 17 8 17 12C17 14.5 12 18.5 12 18.5ZM20 6.093L17 3.093V1H20V6.093Z" />
    </SvgIcon>
));
HeartHouse.displayName = 'ActionHome';
(HeartHouse as any).muiName = 'SvgIcon';

export default HeartHouse;
