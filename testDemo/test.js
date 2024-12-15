let hiBlob = new Blob([`<h1>Hi yangsen!<h1>`], { type: "text/html" });
const blobUrl = window.URL.createObjectURL(hiBlob);

const a = document.createElement("a");
a.href = blobUrl;
a.download = "download.txt";

a.click();
URL.revokeObjectURL(blobUrl);
