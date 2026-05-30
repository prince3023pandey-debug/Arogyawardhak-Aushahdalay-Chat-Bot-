import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Import the client
import Papa from 'papaparse';

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);

  // 1. Fetch initial data on load
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    let { data, error } = await supabase.from('patients').select('*');
    if (!error && data) setPatients(data);
  };

  // 2. Upload CSV to Supabase
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          // Format data to match database columns
          const formattedData = results.data.map(row => ({
            name: row.Name,
            phone: row.Phone,
            order_id: row.OrderID,
            status: row.Status || 'Processing'
          }));

          // Insert or update (upsert) data in Supabase
          const { error } = await supabase
            .from('patients')
            .upsert(formattedData, { onConflict: 'order_id' });

          if (!error) {
            alert("Data uploaded to Supabase!");
            fetchPatients(); // Refresh the table
          } else {
            console.error(error);
          }
        }
      });
    }
  };

  // 3. Update single status in Supabase
  const updateStatus = async (orderId, newStatus) => {
    // Update local UI instantly
    setPatients(patients.map(p => p.order_id === orderId ? { ...p, status: newStatus } : p));
    
    // Update Database
    const { error } = await supabase
      .from('patients')
      .update({ status: newStatus })
      .eq('order_id', orderId);
      
    if (error) alert("Failed to update database.");
  };

  // ... (The rest of the UI rendering remains the same, just map over the 'patients' state)
}