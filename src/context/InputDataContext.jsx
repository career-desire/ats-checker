import React, { createContext, useState, useEffect } from "react";

export const InputDataContext = createContext();

export function InputDataProvider({ children }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [recentDescription, setRecentDescription] = useState(false);

  // Load file from localStorage on mount
  useEffect(() => {
    const storedFile = localStorage.getItem("file");
    if (storedFile) {
      // Convert Base64 back to File object
      const byteString = atob(storedFile.split(",")[1]);
      const mimeString = storedFile.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const restoredFile = new File([ab], "resume.pdf", { type: mimeString });
      setFile(restoredFile);
    }
  }, []);

  // Save file in localStorage as Base64
  const updateFile = (newFile) => {
    if (!newFile) {
      setFile(null);
      localStorage.removeItem("file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("file", reader.result); // Base64 string
    };
    reader.readAsDataURL(newFile);
    setFile(newFile);
  };

  return (
    <InputDataContext.Provider
      value={{
        file,
        setFile: updateFile,
        description,
        setDescription,
        recentDescription,
        setRecentDescription,
      }}
    >
      {children}
    </InputDataContext.Provider>
  );
}
