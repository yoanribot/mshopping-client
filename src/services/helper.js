import parse from 'url-parse';

export const getStoreAndDomain = url => {
  const hostname = parse(url, true).hostname;
  const values = hostname.split('.');

  return {
    store: values[1],
    domain: values[2],
  };
};