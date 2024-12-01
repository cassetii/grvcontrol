
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyASG9qEDFTygF3NYk5Q_eBwVVLhAJraycc",
  authDomain: "grvcustomer.firebaseapp.com",
  projectId: "grvcustomer",
  storageBucket: "grvcustomer.firebasestorage.app",
  messagingSenderId: "531191787211",
  appId: "1:531191787211:web:e6937742df19691a4e754e",
  measurementId: "G-KEH8D4HK6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch all customers from Firestore
async function fetchCustomers() {
  const querySnapshot = await getDocs(collection(db, "customers"));
  const customers = [];
  querySnapshot.forEach((doc) => {
    customers.push({ id: doc.id, ...doc.data() });
  });
  renderTable(customers);
}

// Add a new customer to Firestore
async function addCustomer() {
  const customer = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    cluster: document.getElementById('cluster').value,
    street: document.getElementById('street').value,
    acConfigs: Array.from(document.querySelectorAll('.acType')).map((ac, i) =>
      `${ac.value} ${document.querySelectorAll('.freonType')[i].value}`
    ),
    history: [],
  };

  try {
    await addDoc(collection(db, "customers"), customer);
    alert("Pelanggan berhasil ditambahkan!");
    fetchCustomers();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Gagal menambahkan pelanggan.");
  }
}

// Delete a customer from Firestore
async function deleteCustomer(id) {
  try {
    await deleteDoc(doc(db, "customers", id));
    alert("Pelanggan berhasil dihapus!");
    fetchCustomers();
  } catch (error) {
    console.error("Error deleting document: ", error);
    alert("Gagal menghapus pelanggan.");
  }
}

// Render the table with customers
function renderTable(customers) {
  const tableBody = document.getElementById('customerTable').querySelector('tbody');
  tableBody.innerHTML = '';
  customers.forEach((customer) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.phone}</td>
      <td>${customer.cluster}</td>
      <td>${customer.street}</td>
      <td>${customer.acConfigs.join(', ')}</td>
      <td>
        <button onclick="deleteCustomer('${customer.id}')">Hapus</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Initialize the table on page load
window.onload = fetchCustomers;
