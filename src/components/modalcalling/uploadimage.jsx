import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const UploadImageModal = ({ value }) => {
  const businessID = value;
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("location_type", "business_upload");
    formData.append("id", businessID);

    console.log("Uploaded:", Object.fromEntries(formData));

    // Perform your upload logic here
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        width: "200px",
      }}
    >
      <Box padding={2}>
        <Typography variant="h4" fontSize={"18px"} fontWeight={600}>
          Upload Images
        </Typography>
        <Box sx={{ mt: 2 }}>
          <form onSubmit={handleUpload}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  Choose Image
                </Button>
              </label>

              <Box>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected Preview"
                    style={{ maxWidth: "50%", marginTop: 10 }}
                  />
                )}
              </Box>
            </Grid>
            <Box sx={{ my: 3 }}>
              <TextField
                label="File Name"
                value={fileName}
                sx={{ width: "400px" }}
                disabled
              />
            </Box>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!file || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Upload"}
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Grid>
  );
};

export default UploadImageModal;
