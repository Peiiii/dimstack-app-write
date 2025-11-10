import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";

export const nameSorter = (a: FolderTreeNode, b: FolderTreeNode) => {
  // 正则表达式，用于匹配数字和非数字部分
  const re = /(\d+)|(\D+)/g;

  // 将文件名拆分为数字和非数字部分
  const segmentsA = a.name.match(re);
  const segmentsB = b.name.match(re);

  // Check if either segmentsA or segmentsB is null
  if (!segmentsA || !segmentsB) {
    // Handle the case where one is null, or both are null
    // For example, you might decide to sort by name directly if regex matching fails
    return a.name.localeCompare(b.name);
  }
  // 循环比较每个部分
  while (segmentsA.length && segmentsB.length) {
    const segmentA = segmentsA.shift();
    const segmentB = segmentsB.shift();

    // Ensure segmentA and segmentB are not undefined
    if (typeof segmentA === "undefined" || typeof segmentB === "undefined") {
      // Handle the case where segmentA or segmentB is undefined
      // For example, you might break the loop or compare the remaining elements differently
      break;
    }

    // 检查是否为数字
    const isNumA = !isNaN(parseInt(segmentA));
    const isNumB = !isNaN(parseInt(segmentB));

    // 如果两部分都是数字，按数值比较
    if (isNumA && isNumB) {
      const diff = parseInt(segmentA) - parseInt(segmentB);
      if (diff !== 0) return diff;
    } else if (segmentA !== segmentB) {
      // 如果两部分不相同，按字典顺序比较
      return segmentA.localeCompare(segmentB);
    }
  }

  // 如果所有部分都相同，比较剩余部分的长度
  return segmentsA.length - segmentsB.length;
};
