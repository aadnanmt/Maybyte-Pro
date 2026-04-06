// security headers configuration
export const apiHeader = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
};

export const Fetch = {
    method: 'GET',
    headers: apiHeader,
    credentials: 'same-origin'
};
