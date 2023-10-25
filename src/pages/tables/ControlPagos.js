import React, { useCallback, useEffect, useState } from "react";

import {
  Accordion,
  AccordionItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Divider,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "../../assets/PlusIcon";
import { VerticalDotsIcon } from "../../assets/VerticalDotsIcon";
import { SearchIcon } from "../../assets/SearchIcon";
import { useNavigate } from "react-router";
import axios from "axios";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon";
import { columns, statusOptions } from "../../data/pagos";
import { capitalize } from "../../utils/utils";
import { Typography } from "@material-tailwind/react";


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "mes", "fecha", "cut", "orden", "siaf", "tipoDocumento", "nro", "ftefto", "monto", "area_usuaria", "fecha_recepcion", "nombreProveedor", "clasificador", "responsableControlPrevio", "tdorden"];

function ControlPagos() {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_HOST + "/pagos";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  // const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [visibleColumns, setVisibleColumns] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    // column: "id",
    // direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPagos = [];
    if (data.content?.length) {
      filteredPagos = [...data.content];
    }

    if (hasSearchFilter) {
      filteredPagos = filteredPagos.filter((pago) =>
        pago.siaf.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredPagos = filteredPagos.filter((pago) =>
        Array.from(statusFilter).includes(pago.mes),
      );
    }

    return filteredPagos;
  }, [filterValue, statusFilter, data.content]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage, data.content]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);


  const renderCell = React.useCallback((pago, columnKey) => {
    const cellValue = pago[columnKey];

    switch (columnKey) {
      case "responsableControlPrevio":
        return (
          // <div>
          //   {pago.responsableControlPrevio}
          // </div>
          <User
            avatarProps={{ radius: "full", size: "sm", src: pago.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            className="whitespace-nowrap"
            // description={pago.email}
            name={pago.responsableControlPrevio}
          >
            {cellValue}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">{pago.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[pago.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "nombreProveedor":
      case "region":
        return (
          <Typography className="whitespace-nowrap">
            {cellValue}
          </Typography>
        );
      case "responsable1":
        return (
          <Typography className="whitespace-nowrap">
            {cellValue}
          </Typography>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="sticky left-0">
        <div>
          <Accordion defaultExpandedKeys={["1"]}>
            <AccordionItem key="1" aria-label="Búsqueda avanzada" subtitle="Click aquí para más opciones" title="Pagos">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                  <div className="flex gap-3 sm:min-w-[50%]">
                    {/* <Input
                      isClearable
                      classNames={{
                        base: "w-full sm:max-w-[100%]",
                        inputWrapper: "border-1",
                      }}
                      placeholder="Buscar..."
                      size="sm"
                      startContent={<SearchIcon className="text-default-300" />}
                      value={filterValue}
                      variant="bordered"
                      onClear={() => setFilterValue("")}
                      onValueChange={onSearchChange}
                    />
                    <Button size="sm">
                      Small
                    </Button> */}
                    <div className="flex gap-3">
                      <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                          <Button
                            endContent={<ChevronDownIcon className="text-small" />}
                            size="sm"
                            variant="flat"
                          >
                            Meses
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          disallowEmptySelection
                          aria-label="Table Columns"
                          closeOnSelect={false}
                          selectedKeys={statusFilter}
                          selectionMode="multiple"
                          onSelectionChange={setStatusFilter}
                        >
                          {statusOptions.map((status) => (
                            <DropdownItem key={status.uid} className="capitalize">
                              {capitalize(status.name)}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                          <Button
                            endContent={<ChevronDownIcon className="text-small" />}
                            size="sm"
                            variant="flat"
                          >
                            Columnas
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          disallowEmptySelection
                          aria-label="Table Columns"
                          closeOnSelect={false}
                          selectedKeys={visibleColumns}
                          selectionMode="multiple"
                          onSelectionChange={setVisibleColumns}
                        >
                          {columns.map((column) => (
                            <DropdownItem key={column.uid} className="capitalize">
                              {capitalize(column.name)}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                      <Button
                        className="bg-foreground text-background"
                        endContent={<PlusIcon />}
                        size="sm"
                      >
                        Registrar
                      </Button>
                    </div>
                    {/*                    
                    <div className="flex flex-col gap-2">
                      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          key="iSiaf"
                          type="text"
                          label="SIAF"
                          labelPlacement="outside-left"
                          placeholder="Ingresa N° SIAF"
                        />
                      </div>
                    </div> */}
                  </div>

                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-400 text-small">{data.content?.length} resultados</span>
                  <label className="flex items-center text-default-400 text-small">
                    Elementos por página:
                    <select
                      className="bg-transparent outline-none text-default-400 text-small"
                      onChange={onRowsPerPageChange}
                      defaultValue={10}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </label>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="sticky left-0">
        <div className="py-2 px-2 flex items-center">
          <div className="w-[100%] flex gap-6">
            <Pagination
              // showControls
              classNames={{
                cursor: "bg-foreground text-background",
              }}
              color="default"
              // isDisabled={hasSearchFilter}
              page={page}
              total={pages}
              variant="light"
              onChange={setPage}
              key="lg"
              initialPage={page}
              siblings={2}
            />
            <div className="flex gap-2">
              <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Anterior
              </Button>
              <Button isDisabled={pages === page} size="sm" variant="flat" onPress={onNextPage}>
                Siguiente
              </Button>
            </div>
          </div>
          <div className="flex w-[100%] justify-end">
            <span className="text-small text-default-400">
              {
                selectedKeys.currentKey ? `Registro con ID ${selectedKeys.currentKey} Seleccionado` : ""
              }
              {/* {selectedKeys === "all"
                ? "Todos los elementos seleccionados"
                : `Registro con ID ${selectedKeys.currentKey} Seleccionado`
                //  ` ${JSON.stringify(selectedKeys)} of ${items.length} selected`
              } */}
            </span>
          </div>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  useEffect(() => {
    // Verificar si ya tenemos los datos en el estado local antes de realizar una nueva solicitud.
    if (data.length === 0) {
      const params = {
        size: 10000
      }
      // Realizar una solicitud GET solo si los datos aún no están cargados.
      axios.get(baseURL, { params })
        .then(response => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }
  }, []);


  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Tabla control de pagos"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        color={"warning"}
        // style={{ background: "aqua" }}
        className="controlPagosTabla overflow-y-hidden"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={isLoading} emptyContent={"Sin pagos encontrados"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Divider className="my-4" />
      {/* {JSON.stringify(sortedItems)} */}
    </>
  );
}

export default ControlPagos;