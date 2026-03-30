async function fetchLicense(repo, elem) {
  const defaultValue = "Unknown";
  elem.innerText = "License Loading...";
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/license`,
    );
    const data = await response.json();
    const license = data.license ? data.license.spdx_id : defaultValue;
    elem.innerText = `License: ${license}`;
  } catch (error) {
    elem.innerText = `License: ${license}`;
  } finally {
    // elem.style?.visibility = "visible";
  }
}

window.onload = function () {
  document
    .querySelectorAll("div > article ul > li > a")
    .forEach((element) => {
      try {
        const repo = element.href.match(
          new RegExp("^https://github.com/(.*?)/?$"),
        )[1];
        const tempElem = (() => {
          const tempElem = document.createElement("ul");
          const tempSubElem = document.createElement("li");
          tempElem.appendChild(tempSubElem);
          fetchLicense(repo, tempSubElem);
          return tempElem;
        })();
        element.insertAdjacentElement("afterEnd", tempElem);
        console.log("repo", repo);
      } catch (error) {
        // console.error(error);
      }
    });
};
