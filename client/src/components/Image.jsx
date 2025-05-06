import React from "react";
import { IKImage } from "imagekitio-react";

function Image({ src, classname, alt, w, h, styles }) {
  if (!src) return null;
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      loading="lazy"
      path={src || null}
      alt={alt}
      lqip={{ active: true, quality: 20 }}
      width={w}
      height={h}
      className={classname}
      style={styles}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
}

export default Image;
