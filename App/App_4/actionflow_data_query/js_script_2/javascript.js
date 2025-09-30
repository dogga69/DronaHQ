 // Ensure there is a file to process
  if (!file || file.length === 0) {
    output.error = "No file provided.";
    return output;
  }

  const fileUrl = file[0]; // Get the URL of the uploaded file

  try {
    // 1. Wait for the file to be fetched
    const response = await fetch(fileUrl);
    // 2. Wait for the response to be converted to a blob
    const blob = await response.blob();

    // 3. Wrap the FileReader in a Promise so we can "await" its result
    const base64data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      // The 'loadend' event fires when the read is complete
      reader.onloadend = () => resolve(reader.result);
      // Handle any errors
      reader.onerror = reject;
      // Start reading the file as a Base64 string
      reader.readAsDataURL(blob);
    });

    // 4. Now that we have the data, assign it to the output object
    output.base64 = base64data;

  } catch (error) {
    console.error("Error converting file to Base64:", error);
    output.error = "Failed to process the file.";
  }
