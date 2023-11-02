import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "EDAD", uid: "age", sortable: true },
  { name: "ROL", uid: "role", sortable: true },
  { name: "EQUIPO", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "ESTADO", uid: "status", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };
