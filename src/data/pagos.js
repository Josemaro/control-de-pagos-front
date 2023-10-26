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
	{ name: "N° DE DOCUMENTO", uid: "nroDocumento", sortable: true },
	{ name: "FECHA DE EMISIÓN", uid: "fechaEmision", sortable: true },
	{ name: "N° PAGO", uid: "numeroPago", sortable: true },
	{ name: "OBSERVACION PAGO", uid: "observacionPagos", sortable: true },
	{ name: "ESTADO DOCUMENTO", uid: "estadoDocumento", sortable: true },
	{ name: "FECHA ENTREGA CONTABILIDAD", uid: "fechaEntregaContabilidad", sortable: true },
	{ name: "FECHA 1", uid: "fechaContabilidad_1", sortable: true },
	{ name: "FECHA 2", uid: "fechaContabilidad_2", sortable: true },
	{ name: "MONTO CONTABILIDAD", uid: "montoContabilidad", sortable: true },
	{ name: "RETENCIÓN", uid: "retencionContabilidad", sortable: true },
	{ name: "DETRACCIÓN", uid: "detraccionContabilidad", sortable: true },
	{ name: "PENALIDAD", uid: "penalidadContabilidad", sortable: true },
	{ name: "SITUACIÓN EXPEDIENTE", uid: "situacionExpediente", sortable: true },
	{ name: "POR REVISAR", uid: "porRevisar", sortable: true },
	{ name: "ESTADO DEVENGADO EN SIAF", uid: "estadoDevengadoSiaf", sortable: true },
	{ name: "TIPO DE OBSERVACIÓN", uid: "tipoObservacion", sortable: true },
	{ name: "CONCEPTO", uid: "concepto", sortable: true },
	// TODO ESTADO VALIDACION
	{ name: "ESTADO VALIDACION", uid: "estadoValidacion", sortable: true },
	{ name: "FECHA DE DEVENGADO", uid: "fechaDevengado", sortable: true },
	{ name: "MONTO DEVENGADO APROBADO", uid: "montoDevengadoAprobado", sortable: true },
	{ name: "VALIDACION SIAF", uid: "validaSiaf", sortable: true },
	{ name: "COMPROBANTE DE PAGO TESORERIA", uid: "comprobantePagoTesoreria", sortable: true },
	{ name: "MONTO TOTAL CPS", uid: "montoTotalCps", sortable: true },
	{ name: "OBSERVACIÓN", uid: "observacion", sortable: true },

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
