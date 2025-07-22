import Script from "next/script";

export default function DunsSealScript() {
  return (
    <>
      <Script
        src="https://dunsregistered.dnb.com"
        strategy="afterInteractive"
      />
      {/* Optional container where the seal appears */}
      {/* <div id="duns-registered-seal" /> */}
    </>
  );
}
