const pages = [
  { path: "default", title: "Inventario", hidden: true },
  { path: "/login", title: "Acceso", hidden: true },
  // { path: "/inicio", title: "Inicio" },
  { path: "/inventario", title: "Inventario" },
  { path: "/almacen", title: "Almacen" },
  { path: "/compras", title: "Compras" },
  { path: "/panel", title: "Panel" },
];
const indexed = pages.reduce((a, v) => ({ ...a, [v.path]: v}), {});

export {
  pages,
  indexed
}