import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Stack,
    Icon,
    Input,
    Select,
    Text,
    Box,
    HStack,
    IconButton,
} from "@chakra-ui/react";
import { useTable, usePagination } from "react-table";
import {
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleDoubleRight,
    FaAngleRight,
} from "react-icons/fa";

const DataTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    return (
        <div>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <Stack direction="row" justifyContent="flex-end" pt={1}>
                <HStack spacing={5}>
                    <Select
                        size="md"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 25, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </Select>
                    <Text fontSize="md">
                        Trang&nbsp;{pageIndex + 1}/{pageOptions.length}
                    </Text>
                    <HStack>
                        <IconButton
                            icon={<FaAngleDoubleLeft />}
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        />
                        <IconButton
                            icon={<FaAngleLeft />}
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        />
                        <IconButton
                            icon={<FaAngleRight />}
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        />
                        <IconButton
                            icon={<FaAngleDoubleRight />}
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        />
                    </HStack>
                </HStack>
            </Stack>
        </div>
    );
};

export default DataTable;
