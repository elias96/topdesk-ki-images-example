import toasts from "@sitevision/api/client/toasts";
import router from "@sitevision/api/common/router";
import PropTypes from "prop-types";
import * as React from "react";

const App = () => {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(router.getStandaloneUrl("/image"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.blob();
      })
      .then((blobData) => {
        toasts.publish({
          type: "success",
          message: "Image fetched successfully",
        });

        // eslint-disable-next-line no-undef
        const reader = new FileReader();
        reader.readAsDataURL(blobData);
        reader.onloadend = () => {
          const base64data = reader.result.split(",")[1];
          setImage(base64data);
        };
      })
      .catch((error) => {
        // eslint-disable-next-line no-undef
        console.error(`Failed to fetch image, case: ${JSON.stringify(error)}`);
      });
  }, []);

  return (
    <div>
      <img src={"data:image/png;base64," + image} alt="KI image..." />
    </div>
  );
};

App.propTypes = {
  image: PropTypes.string,
};

export default App;
