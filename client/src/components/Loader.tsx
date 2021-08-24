import React from "react";
import ContentLoader from "react-content-loader";

const Loader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="14" y="263" rx="2" ry="2" width="178" height="13" />
    <rect x="13" y="292" rx="2" ry="2" width="218" height="13" />
    <rect x="12" y="15" rx="2" ry="2" width="229" height="229" />
  </ContentLoader>
);

export default Loader;
