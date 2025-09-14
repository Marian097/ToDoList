import React from 'react'
import {useState, useEffect} from "react"
import {api} from "../api"

export default function ApiStatus() {

    const [status, setStatus] = useState("checking");

    useEffect(() => {
        api.get("/health")
        .then(() => setStatus("ok"))
        .catch(() => setStatus("down"))
    }, [])
  return (
    <div style={{ padding: 8, borderRadius: 8, border: "1px solid #eee", marginBottom: 16 }}>
        <strong>API:</strong>{" "}
        {status === "checking" ? "Verify...." : status === "ok" ?  "OK ✅" : "Indisponibil ❌"}
    </div>
  );
}
