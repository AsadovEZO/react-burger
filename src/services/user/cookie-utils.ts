export function getCookie(name: string) {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    if (key === name) acc.push(decodeURIComponent(value));
    return acc;
  }, [] as string[]);
  const cookieValue = cookies[cookies.length - 1]; 
  if (cookieValue) {
    return cookieValue.startsWith("Bearer ")
      ? cookieValue.replace("Bearer ", "")
      : cookieValue.startsWith("Bearer%20")
      ? cookieValue.replace("Bearer%20", "")
      : cookieValue;
  }
  return undefined;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=-1; path=/; domain=${window.location.hostname}`;
}

export function setCookie(name: string, value: string | null, props: any = {}) {
  // console.log(`Установка куки ${name}:`, value, "текущее время:", new Date().toISOString());
  deleteCookie(name); 
  let exp = props.expires;
  if (typeof exp === "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = value ? encodeURIComponent(value) : "";
  let updatedCookie = `${name}=${value}; path=/; domain=${window.location.hostname}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}