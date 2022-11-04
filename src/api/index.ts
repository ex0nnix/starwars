export async function fetchJson<Response = any>(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(`https://swapi.dev/api/${url}/`, {
    ...(init ?? {}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function fetchFiltered<Response = any>(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(`https://swapi.dev/api/people/?search=${url}`, {
    ...(init ?? {}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function fetchPeople<Response = any>(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(`https://swapi.dev/api/people/?page=${url}`, {
    ...(init ?? {}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function fetchFilm<Response = any>(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(`${url}`, {
    ...(init ?? {}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function fetchSpecies<Response = any>(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(`${url}`, {
    ...(init ?? {}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
