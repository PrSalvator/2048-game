import type { ReactNode } from 'react';
import { GitIcon } from './icons/GitIcon';
import type { IIconProps, IIconType } from './interface';
import { FigmaIcon } from './icons/FigmaIcon';

const IconType: Record<IIconType, ReactNode> = {
    git: <GitIcon />,
    figma: <FigmaIcon />,
};

const Icon = ({ type }: IIconProps) => {
    return <div className="icon">{IconType[type]}</div>;
};

export { Icon };
