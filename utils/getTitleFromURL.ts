const getTitleFromURL = (URL: string) => {
  const arryURL = URL.split("/");
  return arryURL[arryURL.length - 1];
};

export default getTitleFromURL;
