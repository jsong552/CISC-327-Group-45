import { Medicine } from "./AddMedicine";

// medicineData.ts
export let data: Medicine[] = [
    {
      name: "Augmentin 625 Duo Tablet",
      id: "D06ID232435454",
      quantity: "350",
      usage: "Take 1 tablet every 12 hours",
      sideEffects: "Nausea, Diarrhea",
    },
    {
      name: "Azithral 500 Tablet",
      id: "D06ID232435451",
      quantity: "150",
      usage: "Take 1 tablet daily",
      sideEffects: "Headache",
    },
    {
      name: "Ascoril LS Syrup",
      id: "D06ID232435452",
      quantity: "69",
      usage: "10 ml twice a day",
      sideEffects: "Drowsiness",
    },
  ];
  
  // Function to add a new medicine to the data array
  export function addMedicineToData(newMedicine: any) {
    data.push(newMedicine);
  }

  
  export function removeByIndex(index: number) {
    data.splice(index, 1);
  }
  