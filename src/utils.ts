import { SectionType } from './App';
import { v4 as uuid } from 'uuid';

export const onSubmit = (data: SectionType[], id: string): SectionType[] => {
  return data.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        isEdit: false,
      };
    } else if (node.children.length) {
      return {
        ...node,
        children: onSubmit(node.children, id),
      };
    } else return node;
  });
};

export const onInputChange = (
  data: SectionType[],
  value: string,
  id: string,
): SectionType[] => {
  return data.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        comment: value,
      };
    } else if (node.children.length) {
      return {
        ...node,
        children: onInputChange(node.children, value, id),
      };
    } else return node;
  });
};

export const onEdit = (data: SectionType[], id: string): SectionType[] => {
  return data.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        isEdit: true,
      };
    } else if (node.children.length) {
      return {
        ...node,
        children: onEdit(node.children, id),
      };
    } else return node;
  });
};

export const onReplay = (data: SectionType[], id: string): SectionType[] => {
  return data.map((node) => {
    if (node.id === id) {
      node.children.push({
        id: uuid(),
        isEdit: true,
        comment: '',
        isError: false,
        children: [],
      });
      return {
        ...node,
        children: node.children,
      };
    } else if (node.children.length) {
      return {
        ...node,
        children: onReplay(node.children, id),
      };
    } else return node;
  });
};