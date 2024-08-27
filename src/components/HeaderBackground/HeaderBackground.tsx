// src/components/Pattern/Pattern.tsx
import React from 'react';
export enum PatternType {
    DIAMOND = 'diamond',
    CIRCLE = 'circle',
    HEX = 'hex',
    TRIANGLE = 'triangle',
}

export interface PatternProps {
    width: number;
    height: number;
    colors?: string[];
    defaultColor?: string;
    shape?: PatternType;
}

interface ShapeProps {
    x: number;
    y: number;
    fill: string;
}

export const Diamond: React.FC<ShapeProps> = ({ x, y, fill }) => {
    const pathString =
        (x + y) % 2 === 0
            ? `M ${x} ${y - 1} L ${x + 1} ${y} L ${x} ${y + 1} Z`
            : `M ${x} ${y} L ${x + 1} ${y + 1} L ${x + 1} ${y - 1} Z`;

    return <path d={pathString} fill={fill} />;
};

export const Circle: React.FC<ShapeProps> = ({ x, y, fill }) => {
    const pathString = `M ${x} ${y} l 1 0 a 1 1 0 0 1 -1 1 Z`;
    const dx = x + 0.5;
    const dy = y + 0.5;
    const rotate = 90 * Math.floor(Math.random() * 4); // 0, 90, 180, or 270
    const transform = `translate(${dx} ${dy}) rotate(${rotate}) translate(${-dx} ${-dy})`;

    return <path d={pathString} fill={fill} transform={transform} />;
};

export const Hex: React.FC<ShapeProps> = ({ x, y, fill }) => {
    const ox = (x % 4) / 2;
    const px = ((x - 1) / 2) % 2;
    const cx = 0.75 * (x - 1) + 1;

    const pathString =
        x % 2 === 0
            ? `M ${0.75 * x + 1} ${2 * y + ox + 1} L ${0.75 * x + 1.5} ${2 * y + ox} L ${0.75 * x + 1} ${2 * y + ox - 1} L ${0.75 * x} ${2 * y + ox - 1} Z`
            : `M ${cx} ${2 * y + px - 1} L ${cx + 0.5} ${2 * y + px} L ${cx + 1.5} ${2 * y + px} L ${cx + 0.5} ${2 * y + px - 2} Z`;

    return <path d={pathString} fill={fill} transform="scale(1, 0.85)" />;
};

export const Triangle: React.FC<ShapeProps> = ({ x, y, fill }) => {
    return (
        <>
            <rect x={x} y={y} width="1" height="1" fill={fill} />
            <path d={`M ${x} ${y} L ${x + 1} ${y} L ${x + 1} ${y + 1} Z`} fill={fill} />
        </>
    );
};

const defaultColors = ['#025952', '#FAE3BA', '#F1523E', '#F27B35', '#FCA521'];

const sample = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export const HeaderBackground: React.FC<PatternProps> = ({ width, height, colors = defaultColors, shape = PatternType.CIRCLE }) => {
    const renderShape = (x: number, y: number) => {
        const fill = sample(colors);

        switch (shape) {
            case PatternType.DIAMOND:
                return <Diamond key={`${x}-${y}`} x={x} y={y} fill={fill} />;
            case PatternType.HEX:
                return <Hex key={`${x}-${y}`} x={x} y={y} fill={fill} />;
            case PatternType.TRIANGLE:
                return <Triangle key={`${x}-${y}`} x={x} y={y} fill={fill} />;
            case PatternType.CIRCLE:
                return <Circle key={`${x}-${y}`} x={x} y={y} fill={fill} />;
            default:
                return <Circle key={`${x}-${y}`} x={x} y={y} fill={fill} />;
        }
    };

    return (
        <svg viewBox="0 0 25 25" style={{ width: '100%', height: '100%' }}>
            {Array.from({ length: width }, (_, x) =>
                Array.from({ length: height }, (_, y) => renderShape(x, y))
            )}
        </svg>
    );
};