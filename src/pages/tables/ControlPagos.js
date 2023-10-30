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
  Skeleton
} from "@nextui-org/react";
import { PlusIcon } from "../../assets/PlusIcon";
import { RefreshIcon } from "../../assets/RefreshIcon";
import { VerticalDotsIcon } from "../../assets/VerticalDotsIcon";
import { SearchIcon } from "../../assets/SearchIcon";
import { useNavigate } from "react-router";
import axios from "axios";
import { ChevronDownIcon } from "../../assets/ChevronDownIcon";
import { columns, statusOptions, areaUsuariaOptions } from "../../data/pagos";
import { capitalize } from "../../utils/utils";
import { Typography } from "@material-tailwind/react";
import { useSearchParams } from 'react-router-dom';


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const pagoDto = {
  "id": "",
  "cut": "",
  "fecha": "",
  "tipoDocumento": "",
  "nro": "",
  "ftefto": "",
  "monto": "",
  "areaUsuaria": "",
  "fechaRecepcion": "",
  "nombreProveedor": "",
  "orden": "",
  "siaf": "",
  "clasificador": "",
  "responsableControlPrevio": "",
  "tipoOrdenServicioCompra": "",
  "region": "",
  "ruc": "",
  "comprobante": "",
  "nroDocumento": "",
  "fechaEmision": "",
  "penalidad": "",
  "montoPenalidad": "",
  "numeroPago": "",
  "observacionPagos": "",
  "estadoDocumento": "",
  "fechaEntregaContabilidad": "",
  "ultimaModificacion": "",
  "fechaContabilidad_1": "",
  "fechaContabilidad_2": "",
  "estadoControlPrevio": "",
  "responsableContabilidad": "",
  "comprobanteContabilidad": "",
  "montoContabilidad": "",
  "retencionContabilidad": "",
  "detraccionContabilidad": "",
  "penalidadContabilidad": "",
  "situacionExpediente": "",
  "porRevisar": "",
  "estadoDevengadoSiaf": "",
  "tipoObservacion": "",
  "concepto": "",
  "areaCorrige": "",
  "fechaEntrega": "",
  "fechaDevolucion": "",
  "estadoValidacion": "",
  "fechaDevengado": "",
  "montoDevengadoAprobado": "",
  "verificaRepeticion": "",
  "validaSiaf": "",
  "comprobantePagoTesoreria": "",
  "montoTotalCps": "",
  "observacion": "",
  "ubicacion": ""
}

const INITIAL_VISIBLE_COLUMNS = ["id", "mes", "fecha", "cut", "orden", "siaf", "tipoDocumento", "nro", "ftefto", "monto", "area_usuaria", "fecha_recepcion", "nombreProveedor", "clasificador", "responsableControlPrevio", "tdorden"];

function ControlPagos() {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_HOST + "/pagos";
  const [data, setData] = useState([]);
  const [isModifyFormLoaded, setModifyFormLoaded] = React.useState(false);
  const [pagoSeleccionado, setPagoSeleccionado] = useState(pagoDto);
  const [camposModificacion, setCamposModificacion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  // const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [visibleColumns, setVisibleColumns] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [areasUsuarias, setAreasUsuarias] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchParams] = useSearchParams();
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
        Array.from(statusFilter).includes(pago.ftefto),
      );
    }

    if (areasUsuarias !== "all" && Array.from(areasUsuarias).length !== areaUsuariaOptions.length) {
      filteredPagos = filteredPagos.filter((pago) =>
        Array.from(areasUsuarias).includes(pago.areaUsuaria),
      );
    }

    return filteredPagos;
  }, [filterValue, statusFilter, areasUsuarias, data.content]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage, data.content]);

  const sortedItems = React.useMemo(() => {
    //TODO CONSULTA ORDEN ASC DESC POR COLUMNA
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
            className="whitespace-nowrap usuariotabla"
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
      case "observacionPagos":
      case "concepto":
      case "fechaEmision":
      case "fechaContabilidad_1":
      case "fechaContabilidad_2":
      case "observacion":
      case "nroDocumento":
        return (
          <Typography className="whitespace-nowrap" style={{ fontSize: "small" }}>
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
                            Fuente de Financiamiento
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
                            Área Usuaria
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          disallowEmptySelection
                          aria-label="Area Usuaria"
                          closeOnSelect={false}
                          selectedKeys={areasUsuarias}
                          selectionMode="multiple"
                          onSelectionChange={setAreasUsuarias}
                        >
                          {areaUsuariaOptions.map((status) => (
                            <DropdownItem key={status.uid} className="capitalize">
                              {status.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown shouldBlockScroll={false}>
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
                          autoFocus={false}
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
                        className="bg-light-blue-800 text-white"
                        endContent={<RefreshIcon />}
                        size="sm"
                      >
                        Actualizar
                      </Button>
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
                  <span className="text-default-400 text-small">{filteredItems.length} resultados</span>
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
    areasUsuarias,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    hasSearchFilter,
    data
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
              // key="lg"
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

  useEffect(() => {

    // Verificar si ya tenemos los datos en el estado local antes de realizar una nueva solicitud.
    if (selectedKeys.currentKey != null) {

      setModifyFormLoaded(true)
      setPagoSeleccionado(pagoDto);

      // Realizar una solicitud GET solo si los datos aún no están cargados.
      axios.get(baseURL + '/' + selectedKeys.currentKey)
        .then(response => {
          setPagoSeleccionado(response.data);
          setCamposModificacion({})
          setModifyFormLoaded(true)
        })
        .catch(error => {
          setCamposModificacion({})
          console.error('Error al obtener los datos:', error);
        });
    }
  }, [selectedKeys]);
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Tabla control de pagos"
        bottomContent={pages > 0 && bottomContent}
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
        color={"success"}
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
            <TableRow key={item.id} className="cursor-pointer" >
              {(columnKey) => <TableCell style={{ fontSize: "small" }}>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Divider className="my-4" />
      {/* {JSON.stringify(sortedItems)} */}
      <div className="flex gap-4 detalleContenedor" >
        <div className="w-3/12">
          <div className="w-full flex flex-col gap-4 ">
            <div key="iid" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input isReadOnly={true} className="" value={pagoSeleccionado.id} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, id: e.target.value }) }} id="inputId" label="ID" placeholder="ID" labelPlacement="outside-left" type="text" size="xs" variant="Secondary" />
            </div>
            <div key="iSIAF" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.siaf} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, siaf: e.target.value }); setCamposModificacion({ ...camposModificacion, siaf: e.target.value }) }} id="inputSIAF" label="SIAF" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
            </div>
            <div key="iOrden" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.orden} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, orden: e.target.value }); setCamposModificacion({ ...camposModificacion, orden: e.target.value }) }} id="inputOrden" label="ÓRDEN" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
            </div>
            <div key="iFechaRecepcion" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.fechaRecepcion} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, fechaRecepcion: e.target.value }); setCamposModificacion({ ...camposModificacion, fechaRecepcion: e.target.value }) }} id="inputFechaRecepcion" label="FECHA DE RECEPCIÓN" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
            </div>
            <div key="iProveedor" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.nombreProveedor} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, nombreProveedor: e.target.value }); setCamposModificacion({ ...camposModificacion, nombreProveedor: e.target.value }) }} id="inputNombreProveedor" label="PROVEEDOR" labelPlacement="outside-left" type="text" size="xs" variant="bordered" fullWidth />
            </div>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="w-3/12">
          <div className="w-full flex flex-col gap-4">
            <div key="iNro" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              {/* <Skeleton className="w-4/5 rounded-lg" isLoaded={isModifyFormLoaded}> */}
              <Input value={pagoSeleccionado.nro} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, nro: e.target.value }); setCamposModificacion({ ...camposModificacion, nro: e.target.value }) }} id="inputNro" label="N°" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
              {/* </Skeleton> */}
            </div>
            <div key="CUT" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              {/* <Skeleton className="w-4/5 rounded-lg" isLoaded={isModifyFormLoaded}> */}
              <Input value={pagoSeleccionado.cut} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, cut: e.target.value }); setCamposModificacion({ ...camposModificacion, cut: e.target.value }) }} id="CUT" label="CUT" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
              {/* </Skeleton> */}
            </div>
            <div key="TipoDocumento" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.tipoDocumento} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, tipoDocumento: e.target.value }); setCamposModificacion({ ...camposModificacion, tipoDocumento: e.target.value }) }} id="TipoDocLabel" label="TIPO DE DOCUMENTO" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
            </div>
            <div key="fteFto" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.ftefto} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, ftefto: e.target.value }); setCamposModificacion({ ...camposModificacion, ftefto: e.target.value }) }} id="FteFtoLabel" label="FTE FTO RD -18 ROOC- 19 RO-00" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
            </div>
            <div key="monto" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.monto} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, monto: e.target.value }); setCamposModificacion({ ...camposModificacion, monto: e.target.value }) }} id="MontoLabel" label="MONTO" labelPlacement="outside-left" type="TEXT" size="xs" variant="bordered" />
            </div>
            <div key="areaUsuaria" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.areaUsuaria} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, areaUsuaria: e.target.value }); setCamposModificacion({ ...camposModificacion, areaUsuaria: e.target.value }) }} id="AreaUsuariaLabel" label="ÁREA USUARIA" labelPlacement="outside-left" type="text" size="xs" variant="bordered" />
            </div>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="w-3/12">
          <div className="w-full flex flex-col gap-4">
            <div key="tipoOrdenServicio" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.tipoOrdenServicioCompra} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, tipoOrdenServicioCompra: e.target.value }); setCamposModificacion({ ...camposModificacion, tipoOrdenServicioCompra: e.target.value }) }} id="tipoOrdenServicioCompraLabel" label="TIPO DE ORDEN: SERVICIO/COMPRA" labelPlacement="outside-left" type="TEXT" size="xs" variant="bordered" />
            </div>
            <div key="region" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.region} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, region: e.target.value }); setCamposModificacion({ ...camposModificacion, region: e.target.value }) }} id="region" label="REGIÓN" labelPlacement="outside-left" type="TEXT" size="xs" variant="bordered" />
            </div>
            <div key="responsable" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.responsableControlPrevio} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, responsableControlPrevio: e.target.value }); setCamposModificacion({ ...camposModificacion, responsableControlPrevio: e.target.value }) }} id="ResponsableLabel" label="RESPONSABLE" labelPlacement="outside-left" type="TEXT" size="xs" variant="bordered" />
            </div>
            <div key="ruc" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.ruc} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, ruc: e.target.value }); setCamposModificacion({ ...camposModificacion, ruc: e.target.value }) }} id="RUCLabel" label="RUC" labelPlacement="outside-left" type="TEXT" size="xs" variant="bordered" />
            </div>
            <div key="nroDocumento" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.nroDocumento} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, nroDocumento: e.target.value }); setCamposModificacion({ ...camposModificacion, nroDocumento: e.target.value }) }} id="nroDocumento" label="N° DE DOCUMENTO" labelPlacement="outside-left" type="TEXT" size="xs" variant="bordered" />
            </div>
            <div key="comprobante" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
              <Input value={pagoSeleccionado.comprobante} onChange={(e) => { setPagoSeleccionado({ ...pagoSeleccionado, comprobante: e.target.value }); setCamposModificacion({ ...camposModificacion, comprobante: e.target.value }) }} id="comprobante" label="COMPROBANTE" labelPlacement="outside-left" type="TEXT" size="xs" variant="bordered" />
            </div>

          </div>
        </div>

        <Divider orientation="vertical" />
        <div className="w-3/12">
          {JSON.stringify(camposModificacion)}
          {/* <div className="w-full flex flex-col gap-4">
              <div key="CUT" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
                <Input id="CUT" label="CUT" placeholder="Ingresar cut" labelPlacement="outside-left" type="text" size="xs" variant="primary" />
              </div>
              <div key="Orden" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
                <Input id="Orden" label="Orden" placeholder="Ingresar Orden" labelPlacement="outside-left" type="text" size="xs" variant="primary" />
              </div>
              <div key="SIAF" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
                <Input id="SIAF" label="SIAF" placeholder="Ingresar SIAF" labelPlacement="outside-left" type="text" size="xs" variant="primary" />
              </div>
              <div key="email" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-1 gap-4">
                <Input id="CUT" label="CUT" placeholder="Ingresar cut" labelPlacement="outside-left" type="text" size="xs" variant="primary" />
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
}

export default ControlPagos;