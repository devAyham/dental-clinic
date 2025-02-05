import { default_item_per_page, default_page } from 'src/constant';
// TODO edit function to accept multi relation names and inner relation 
interface PaginatorProps<T> {
  Modal: any,
  page: number,
  item_per_page: number,
  search?: string
  relations?: T
}

export async function PaginatorService<T>(
  {
    Modal,
    item_per_page = default_item_per_page,
    page = default_page,
    relations,
    search
  }: PaginatorProps<T>)
  : Promise<{
    data: any;
    totalPages: number;
    page: number;
    item_per_page: number;
  }> {

  if (page > 0) page--;
  const skip = page * item_per_page;
  // const {where , ...restprops} = relations as any

  let where = {}
  let restProps = {}
  if (typeof relations === 'object') {
    if ('where' in relations) {
      where = relations.where
    }
    const relationProps = Object.keys(relations);
    const hasOtherProps = relationProps.some(prop => prop !== 'where');
    if (hasOtherProps) {
      const { ...props } = relations
      restProps = props;
    }
  }
  const modelKeys = await Modal.findFirst().then(data => {
    if (data)
      return Object.keys(data).filter(key => typeof data[key] === 'string' && key !== 'gender');
    else return []
  })
  const serchObject = search ? {
    OR: modelKeys.map((key: string) => {
      return {
        [key]: {
          contains: search
        },
      }
    })
  } : {}

  const data = await Modal.findMany({
    take: item_per_page, skip, where: {
      ...where,
      ...serchObject
    }, ...restProps
  });


  const totalItems = await Modal.count({
    where
  });
  
  const totalPages = Math.ceil(totalItems / item_per_page);
  return {
    data,
    totalPages,
    page: ++page,
    item_per_page,
  };
}