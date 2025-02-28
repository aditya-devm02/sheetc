import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCell, updateSelection, updateColumnWidth, updateRowHeight } from '../../store/slices/spreadSheetSlice';
import Cell from './Cell';
import ResizeHandle from './ResizeHandle';

const MemoizedCell = memo(Cell);

const Grid = () => {
    const dispatch = useDispatch();
    const gridRef = useRef();
    const containerRef = useRef();
    const resizeObserverRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

    const { columnCount, rowCount, activeCell, selection, columnWidths, rowHeights } = useSelector((state) => state.spreadSheet);
    const DEFAULT_COLUMN_WIDTH = 100;
    const DEFAULT_ROW_HEIGHT = 32;

    const getColumnLabel = useCallback((index) => {
        let label = '';
        index += 1;
        while (index > 0) {
            index--;
            label = String.fromCharCode(65 + (index % 26)) + label;
            index = Math.floor(index / 26);
        }
        return label;
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            resizeObserverRef.current = new ResizeObserver((entries) => {
                const { width, height } = entries[0].contentRect;
                setGridSize({ width: width - 64, height: height - 40 });
            });
            resizeObserverRef.current.observe(containerRef.current);
        }
        return () => resizeObserverRef.current?.disconnect();
    }, []);

    const handleMouseDown = useCallback((rowIndex, colIndex, e) => {
        if (e.button !== 0) return;
        const cellId = `${getColumnLabel(colIndex)}${rowIndex + 1}`;
        dispatch(setActiveCell(cellId));
        setIsDragging(true);
        setDragStart({ row: rowIndex, col: colIndex });
        dispatch(updateSelection({ start: { row: rowIndex, col: colIndex }, end: { row: rowIndex, col: colIndex } }));
    }, [dispatch, getColumnLabel]);

    const handleMouseMove = useCallback((rowIndex, colIndex) => {
        if (!isDragging || !dragStart) return;
        dispatch(updateSelection({ start: dragStart, end: { row: rowIndex, col: colIndex } }));
    }, [isDragging, dragStart, dispatch]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setDragStart(null);
    }, []);

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseUp]);

    const isCellSelected = useCallback((rowIndex, colIndex) => {
        if (!selection.start || !selection.end) return false;
        const minRow = Math.min(selection.start.row, selection.end.row);
        const maxRow = Math.max(selection.start.row, selection.end.row);
        const minCol = Math.min(selection.start.col, selection.end.col);
        const maxCol = Math.max(selection.start.col, selection.end.col);
        return rowIndex >= minRow && rowIndex <= maxRow && colIndex >= minCol && colIndex <= maxCol;
    }, [selection]);

    return (
        <div className="overflow-auto w-full h-full" onMouseUp={handleMouseUp} ref={containerRef}>
            <div className="inline-block min-w-full relative">
                <div className="flex sticky top-0 z-30 bg-gray-50">
                    <div className="w-16 h-8 bg-gray-100 border-r border-b border-gray-300 sticky top-0 left-0 z-40 shrink-0" />
                    <div className="flex">
                        {Array.from({ length: columnCount }).map((_, index) => (
                            <div key={`header-${index}`} className="bg-gray-100 border-r border-b border-gray-300 flex items-center justify-center text-sm text-gray-600 shrink-0 sticky top-0 z-30" style={{ width: columnWidths[index] || DEFAULT_COLUMN_WIDTH, height: 32 }}>
                                {getColumnLabel(index)}
                                <ResizeHandle type="column" index={index} initialSize={columnWidths[index] || DEFAULT_COLUMN_WIDTH} onResize={(width) => dispatch(updateColumnWidth({ index, width }))} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='sticky left-0 z-20'>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <div key={`row-${rowIndex}`} className='flex'>
                            <div className="w-16 bg-gray-100 border-r border-b border-gray-300 flex items-center justify-center text-sm text-gray-600 z-20 shrink-0 sticky left-0" style={{ height: rowHeights[rowIndex] || DEFAULT_ROW_HEIGHT }}>
                                {rowIndex + 1}
                                <ResizeHandle type="row" index={rowIndex} initialSize={rowHeights[rowIndex] || DEFAULT_ROW_HEIGHT} onResize={(height) => dispatch(updateRowHeight({ index: rowIndex, height }))} />
                            </div>
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <div key={`cell-${rowIndex}-${colIndex}`} className={`border-r border-b border-gray-300 relative shrink-0 ${isCellSelected(rowIndex, colIndex) ? 'bg-green-50 ring-2 ring-green-400 z-10' : 'bg-white'}`} style={{ width: columnWidths[colIndex] || DEFAULT_COLUMN_WIDTH, height: rowHeights[rowIndex] || DEFAULT_ROW_HEIGHT }} onMouseDown={(e) => handleMouseDown(rowIndex, colIndex, e)} onMouseMove={() => handleMouseMove(rowIndex, colIndex)}>
                                    <MemoizedCell rowIndex={rowIndex} colIndex={colIndex} isActive={activeCell === `${getColumnLabel(colIndex)}${rowIndex + 1}`} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(Grid);