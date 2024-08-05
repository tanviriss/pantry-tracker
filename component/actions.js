'use client'
import { query, getDocs, collection } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { firestore } from "../firebase"; 

export const generateRecipe = async () => {

  // useEffect(() => {
  //   const q = query(collection(db, 'inventory'))
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let itemsArr = []
  //     querySnapshot.forEach((doc) => {
  //       itemsArr.push({...doc.data(), id: doc.id})
  //     })
  //     setItems(itemsArr)
  //   })
  //   return () => unsubscribe();
  // }, [])
  
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Initialize Firestore correctly
  const inventoryCollection = collection(firestore, 'inventory');
  const snapshot = await getDocs(query(inventoryCollection));

  // Extract items from the snapshot
  const items = snapshot.docs.map(doc => {
    const data = doc.data();
    return { name: data.name, quantity: data.quantity };
  });


  const prompt = `Make a step-by-step recipe using the following ingredients: ${items.map(e => `${e.name} ${e.quantity}`).join(", ")}. It does not have to include all of the ingredients. Return the recipe in a step-by-step format.`;

  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  return text;
}
