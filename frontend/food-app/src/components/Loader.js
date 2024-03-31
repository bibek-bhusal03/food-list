import React from "react";
import { useState, useEffect } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    window.addEventListener("load", handleLoad);
    document.addEventListener("click", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      document.removeEventListener("click", handleLoad);
    };
  }, []);
  if (loading) {
    return (
      <>
        <div className="loader-wrapper">
          <div className="loader-content">
            <div class="loading loading01">
              <span><i class="fa fa-seedling mr-3"></i></span>  
              <span>N</span>
              <span>U</span>
              <span>T</span>
              <span>R</span>
              <span>I</span>
              <span>N</span>
              <span>E</span>
              <span>S</span>
              <span>T</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
