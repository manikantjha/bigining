import Script from "next/script";

export default function DunsSealScript() {
  return (
    <>
      <Script
        src="https://dunsregistered.dnb.com"
        type="text/javascript"
        lang="JavaScript"
        
      />
      {/* Optional container where the seal appears */}
      {/* <div id="duns-registered-seal" /> */}
    </>
  );
}
