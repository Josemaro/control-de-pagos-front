import React from "react";

const columns = [
	{ name: "ID", uid: "id", sortable: true },
	{ name: "MES", uid: "mes", sortable: true },
	{ name: "FECHA", uid: "fecha", sortable: true },
	{ name: "CUT", uid: "cut", sortable: true },
	{ name: "ORDEN", uid: "orden", sortable: true },
	{ name: "SIAF", uid: "siaf", sortable: true },
	{ name: "TIPO DOC", uid: "tipo_documento" },
	{ name: "N°", uid: "nro" },
	{ name: "FTE FTO", uid: "ftefto", sortable: true },
	{ name: "MONTO", uid: "monto" },
	{ name: "ÁREA USUARIA", uid: "areaUsuaria", sortable: true },
	{ name: "FECHA DE RECEPCIÓN", uid: "fechaRecepcion", sortable: true },
	{ name: "PROVEEDOR", uid: "nombreProveedor", sortable: true },
	{ name: "CLASIFICADOR", uid: "clasificador", sortable: true },
	{ name: "RESPONSABLE CONTROL PREVIO", uid: "responsableControlPrevio", sortable: true },
	{ name: "TIPO DE ORDEN", uid: "tipoOrdenServicioCompra", sortable: true },
	{ name: "REGION", uid: "region", sortable: true },
	{ name: "RUC", uid: "ruc", sortable: true },
	{ name: "COMPROBANTE", uid: "comprobante", sortable: true },
	{ name: "N° DE DOCUMENTO", uid: "nrodocumento", sortable: true },
	

];

const statusOptions = [
	{ name: "Enero", uid: "enero" },
	{ name: "Febrero", uid: "febrero" },
	{ name: "Marzo", uid: "marzo" },
	{ name: "Abril", uid: "abril" },
	{ name: "Mayo", uid: "mayo" },
	{ name: "Junio", uid: "junio" },
	{ name: "Julio", uid: "julio" },
	{ name: "Agosto", uid: "agosto" },
	{ name: "Septiembre", uid: "septiembre" },
	{ name: "Octubre", uid: "octubre" },
	{ name: "Noviembre", uid: "noviembre" },
	{ name: "Diciembre", uid: "diciembre" },
];



export { columns, statusOptions };
