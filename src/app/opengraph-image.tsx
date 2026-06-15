import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/branding";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KDIGIT — Innovation digitale";

export default async function OpenGraphImage() {
  const src = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          padding: 48,
        }}
      >
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
