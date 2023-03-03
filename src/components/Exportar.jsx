import React from "react";

export default function Exportar(props) {
  let link = "https://cryptogymbackend-production.up.railway.app/api/exportar/";
  return (
    <div>
      {/* agregar botones de exportar csv y pdf */}
      <a
        variant="primary"
        className="mb-3"
        href={link + "csv/" + props.nombreTabla}
      >
        Exportar a CSV
      </a>
      <a
        variant="primary"
        className="mb-3 mx-2"
        href={link + "pdf/" + props.nombreTabla}
      >
        Exportar a PDF
      </a>
    </div>
  );
}


