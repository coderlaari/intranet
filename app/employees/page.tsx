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

type Employee = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      console.log("Fetching employees...");
      setLoading(true);

      const { data, error } = await supabase.from("profiles").select("*");

      console.log("Data:", data);
      console.log("Error:", error);

      if (data) setEmployees(data);
      setLoading(false);
    }

    fetchEmployees();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center">
        <img
          className="w-20 h-20 animate-spin mb-4"
          src="./loading.png"
          alt="Loading image"
        />
        <h1 className="text-4xl">Loading data, please wait...</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-5xl text-center mt-5 mb-5">Employees</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.first_name}</TableCell>
              <TableCell>{emp.last_name}</TableCell>
              <TableCell>{emp.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
