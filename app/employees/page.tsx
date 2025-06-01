"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Update path based on your file structure
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { UUID } from "crypto";

type Employee = {
  id: UUID;
  name: string;
  email: string;
  position: string;
};

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      console.log("Fetching employees...");
      setLoading(true);

      const { data, error } = await supabase.from("employees").select("*");

      console.log("Data:", data);
      console.log("Error:", error);

      if (data) setEmployees(data);
      setLoading(false);
    }

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-5xl text-center mt-5 mb-5">Employees</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Position</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
