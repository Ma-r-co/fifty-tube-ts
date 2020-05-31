export const scramble = (org: string): number[] => {
  return org.split('').map((c, i) => (
    c.charCodeAt(0) + i
  ));
}

export const convert = (arr: ReturnType<typeof scramble>): string => {
  let rst = arr.map((n, i) => (
    String.fromCharCode(n - i)
  ));
  return rst.join('')
}
