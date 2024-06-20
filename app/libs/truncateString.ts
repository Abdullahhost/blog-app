

export const truncateString = (input: string) => {
    const splitdescrption = input.split(' ');
    const splitData = splitdescrption.slice(0, 10);
    const truncateData = splitData.map((ele) => ele + " ")

    const test = truncateData.toLocaleString();

    const exp = test.replaceAll(",", ""); 

    return exp;

}