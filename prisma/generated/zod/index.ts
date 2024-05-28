import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const CollectionScalarFieldEnumSchema = z.enum(['id','name','description','userId']);

export const CardScalarFieldEnumSchema = z.enum(['id','question','answer','collectionId','box']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const BoxSchema = z.enum(['BEGINNER','INTERMEDIATE','ADVANCED']);

export type BoxType = `${z.infer<typeof BoxSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COLLECTION SCHEMA
/////////////////////////////////////////

export const CollectionSchema = z.object({
  id: z.string().cuid(),
  name: z.string().trim().min(1, { message: "The name can't be empty" }),
  description: z.string().trim().nullable(),
  userId: z.string(),
})

export type Collection = z.infer<typeof CollectionSchema>

/////////////////////////////////////////
// CARD SCHEMA
/////////////////////////////////////////

export const CardSchema = z.object({
  box: BoxSchema,
  id: z.string().cuid(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }),
  answer: z.string().trim().min(1, { message: "The answer can't be empty" }),
  collectionId: z.string(),
})

export type Card = z.infer<typeof CardSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COLLECTION
//------------------------------------------------------

export const CollectionIncludeSchema: z.ZodType<Prisma.CollectionInclude> = z.object({
  cards: z.union([z.boolean(),z.lazy(() => CardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CollectionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CollectionArgsSchema: z.ZodType<Prisma.CollectionDefaultArgs> = z.object({
  select: z.lazy(() => CollectionSelectSchema).optional(),
  include: z.lazy(() => CollectionIncludeSchema).optional(),
}).strict();

export const CollectionCountOutputTypeArgsSchema: z.ZodType<Prisma.CollectionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CollectionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CollectionCountOutputTypeSelectSchema: z.ZodType<Prisma.CollectionCountOutputTypeSelect> = z.object({
  cards: z.boolean().optional(),
}).strict();

export const CollectionSelectSchema: z.ZodType<Prisma.CollectionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  userId: z.boolean().optional(),
  cards: z.union([z.boolean(),z.lazy(() => CardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CollectionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CARD
//------------------------------------------------------

export const CardIncludeSchema: z.ZodType<Prisma.CardInclude> = z.object({
  collection: z.union([z.boolean(),z.lazy(() => CollectionArgsSchema)]).optional(),
}).strict()

export const CardArgsSchema: z.ZodType<Prisma.CardDefaultArgs> = z.object({
  select: z.lazy(() => CardSelectSchema).optional(),
  include: z.lazy(() => CardIncludeSchema).optional(),
}).strict();

export const CardSelectSchema: z.ZodType<Prisma.CardSelect> = z.object({
  id: z.boolean().optional(),
  question: z.boolean().optional(),
  answer: z.boolean().optional(),
  collectionId: z.boolean().optional(),
  box: z.boolean().optional(),
  collection: z.union([z.boolean(),z.lazy(() => CollectionArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CollectionWhereInputSchema: z.ZodType<Prisma.CollectionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CollectionWhereInputSchema),z.lazy(() => CollectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CollectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CollectionWhereInputSchema),z.lazy(() => CollectionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cards: z.lazy(() => CardListRelationFilterSchema).optional()
}).strict();

export const CollectionOrderByWithRelationInputSchema: z.ZodType<Prisma.CollectionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  cards: z.lazy(() => CardOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CollectionWhereUniqueInputSchema: z.ZodType<Prisma.CollectionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name_userId: z.lazy(() => CollectionNameUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name_userId: z.lazy(() => CollectionNameUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name_userId: z.lazy(() => CollectionNameUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CollectionWhereInputSchema),z.lazy(() => CollectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CollectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CollectionWhereInputSchema),z.lazy(() => CollectionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "The name can't be empty" }) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().trim() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cards: z.lazy(() => CardListRelationFilterSchema).optional()
}).strict());

export const CollectionOrderByWithAggregationInputSchema: z.ZodType<Prisma.CollectionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CollectionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CollectionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CollectionMinOrderByAggregateInputSchema).optional()
}).strict();

export const CollectionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CollectionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CollectionScalarWhereWithAggregatesInputSchema),z.lazy(() => CollectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CollectionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CollectionScalarWhereWithAggregatesInputSchema),z.lazy(() => CollectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CardWhereInputSchema: z.ZodType<Prisma.CardWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  collectionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  box: z.union([ z.lazy(() => EnumBoxFilterSchema),z.lazy(() => BoxSchema) ]).optional(),
  collection: z.union([ z.lazy(() => CollectionRelationFilterSchema),z.lazy(() => CollectionWhereInputSchema) ]).optional(),
}).strict();

export const CardOrderByWithRelationInputSchema: z.ZodType<Prisma.CardOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  collectionId: z.lazy(() => SortOrderSchema).optional(),
  box: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => CollectionOrderByWithRelationInputSchema).optional()
}).strict();

export const CardWhereUniqueInputSchema: z.ZodType<Prisma.CardWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    question: z.string().trim().min(1, { message: "The question can't be empty" })
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    question: z.string().trim().min(1, { message: "The question can't be empty" }),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }).optional(),
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1, { message: "The answer can't be empty" }) ]).optional(),
  collectionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  box: z.union([ z.lazy(() => EnumBoxFilterSchema),z.lazy(() => BoxSchema) ]).optional(),
  collection: z.union([ z.lazy(() => CollectionRelationFilterSchema),z.lazy(() => CollectionWhereInputSchema) ]).optional(),
}).strict());

export const CardOrderByWithAggregationInputSchema: z.ZodType<Prisma.CardOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  collectionId: z.lazy(() => SortOrderSchema).optional(),
  box: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CardCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CardMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CardMinOrderByAggregateInputSchema).optional()
}).strict();

export const CardScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CardScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  collectionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  box: z.union([ z.lazy(() => EnumBoxWithAggregatesFilterSchema),z.lazy(() => BoxSchema) ]).optional(),
}).strict();

export const CollectionCreateInputSchema: z.ZodType<Prisma.CollectionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1, { message: "The name can't be empty" }),
  description: z.string().trim().optional().nullable(),
  userId: z.string(),
  cards: z.lazy(() => CardCreateNestedManyWithoutCollectionInputSchema).optional()
}).strict();

export const CollectionUncheckedCreateInputSchema: z.ZodType<Prisma.CollectionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1, { message: "The name can't be empty" }),
  description: z.string().trim().optional().nullable(),
  userId: z.string(),
  cards: z.lazy(() => CardUncheckedCreateNestedManyWithoutCollectionInputSchema).optional()
}).strict();

export const CollectionUpdateInputSchema: z.ZodType<Prisma.CollectionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1, { message: "The name can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().trim(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cards: z.lazy(() => CardUpdateManyWithoutCollectionNestedInputSchema).optional()
}).strict();

export const CollectionUncheckedUpdateInputSchema: z.ZodType<Prisma.CollectionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1, { message: "The name can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().trim(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cards: z.lazy(() => CardUncheckedUpdateManyWithoutCollectionNestedInputSchema).optional()
}).strict();

export const CollectionCreateManyInputSchema: z.ZodType<Prisma.CollectionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1, { message: "The name can't be empty" }),
  description: z.string().trim().optional().nullable(),
  userId: z.string()
}).strict();

export const CollectionUpdateManyMutationInputSchema: z.ZodType<Prisma.CollectionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1, { message: "The name can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().trim(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CollectionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CollectionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1, { message: "The name can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().trim(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardCreateInputSchema: z.ZodType<Prisma.CardCreateInput> = z.object({
  id: z.string().cuid().optional(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }),
  answer: z.string().trim().min(1, { message: "The answer can't be empty" }),
  box: z.lazy(() => BoxSchema).optional(),
  collection: z.lazy(() => CollectionCreateNestedOneWithoutCardsInputSchema)
}).strict();

export const CardUncheckedCreateInputSchema: z.ZodType<Prisma.CardUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }),
  answer: z.string().trim().min(1, { message: "The answer can't be empty" }),
  collectionId: z.string(),
  box: z.lazy(() => BoxSchema).optional()
}).strict();

export const CardUpdateInputSchema: z.ZodType<Prisma.CardUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string().trim().min(1, { message: "The question can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string().trim().min(1, { message: "The answer can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  box: z.union([ z.lazy(() => BoxSchema),z.lazy(() => EnumBoxFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.lazy(() => CollectionUpdateOneRequiredWithoutCardsNestedInputSchema).optional()
}).strict();

export const CardUncheckedUpdateInputSchema: z.ZodType<Prisma.CardUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string().trim().min(1, { message: "The question can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string().trim().min(1, { message: "The answer can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collectionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  box: z.union([ z.lazy(() => BoxSchema),z.lazy(() => EnumBoxFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardCreateManyInputSchema: z.ZodType<Prisma.CardCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }),
  answer: z.string().trim().min(1, { message: "The answer can't be empty" }),
  collectionId: z.string(),
  box: z.lazy(() => BoxSchema).optional()
}).strict();

export const CardUpdateManyMutationInputSchema: z.ZodType<Prisma.CardUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string().trim().min(1, { message: "The question can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string().trim().min(1, { message: "The answer can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  box: z.union([ z.lazy(() => BoxSchema),z.lazy(() => EnumBoxFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string().trim().min(1, { message: "The question can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string().trim().min(1, { message: "The answer can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  collectionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  box: z.union([ z.lazy(() => BoxSchema),z.lazy(() => EnumBoxFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CardListRelationFilterSchema: z.ZodType<Prisma.CardListRelationFilter> = z.object({
  every: z.lazy(() => CardWhereInputSchema).optional(),
  some: z.lazy(() => CardWhereInputSchema).optional(),
  none: z.lazy(() => CardWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const CardOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CardOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollectionNameUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.CollectionNameUserIdCompoundUniqueInput> = z.object({
  name: z.string(),
  userId: z.string()
}).strict();

export const CollectionCountOrderByAggregateInputSchema: z.ZodType<Prisma.CollectionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollectionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CollectionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CollectionMinOrderByAggregateInputSchema: z.ZodType<Prisma.CollectionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumBoxFilterSchema: z.ZodType<Prisma.EnumBoxFilter> = z.object({
  equals: z.lazy(() => BoxSchema).optional(),
  in: z.lazy(() => BoxSchema).array().optional(),
  notIn: z.lazy(() => BoxSchema).array().optional(),
  not: z.union([ z.lazy(() => BoxSchema),z.lazy(() => NestedEnumBoxFilterSchema) ]).optional(),
}).strict();

export const CollectionRelationFilterSchema: z.ZodType<Prisma.CollectionRelationFilter> = z.object({
  is: z.lazy(() => CollectionWhereInputSchema).optional(),
  isNot: z.lazy(() => CollectionWhereInputSchema).optional()
}).strict();

export const CardCountOrderByAggregateInputSchema: z.ZodType<Prisma.CardCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  collectionId: z.lazy(() => SortOrderSchema).optional(),
  box: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CardMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  collectionId: z.lazy(() => SortOrderSchema).optional(),
  box: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardMinOrderByAggregateInputSchema: z.ZodType<Prisma.CardMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  collectionId: z.lazy(() => SortOrderSchema).optional(),
  box: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBoxWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBoxWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BoxSchema).optional(),
  in: z.lazy(() => BoxSchema).array().optional(),
  notIn: z.lazy(() => BoxSchema).array().optional(),
  not: z.union([ z.lazy(() => BoxSchema),z.lazy(() => NestedEnumBoxWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBoxFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBoxFilterSchema).optional()
}).strict();

export const CardCreateNestedManyWithoutCollectionInputSchema: z.ZodType<Prisma.CardCreateNestedManyWithoutCollectionInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutCollectionInputSchema),z.lazy(() => CardCreateWithoutCollectionInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema),z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyCollectionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CardUncheckedCreateNestedManyWithoutCollectionInputSchema: z.ZodType<Prisma.CardUncheckedCreateNestedManyWithoutCollectionInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutCollectionInputSchema),z.lazy(() => CardCreateWithoutCollectionInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema),z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyCollectionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const CardUpdateManyWithoutCollectionNestedInputSchema: z.ZodType<Prisma.CardUpdateManyWithoutCollectionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutCollectionInputSchema),z.lazy(() => CardCreateWithoutCollectionInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema),z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CardUpsertWithWhereUniqueWithoutCollectionInputSchema),z.lazy(() => CardUpsertWithWhereUniqueWithoutCollectionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyCollectionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CardUpdateWithWhereUniqueWithoutCollectionInputSchema),z.lazy(() => CardUpdateWithWhereUniqueWithoutCollectionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CardUpdateManyWithWhereWithoutCollectionInputSchema),z.lazy(() => CardUpdateManyWithWhereWithoutCollectionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CardUncheckedUpdateManyWithoutCollectionNestedInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyWithoutCollectionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutCollectionInputSchema),z.lazy(() => CardCreateWithoutCollectionInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema),z.lazy(() => CardCreateOrConnectWithoutCollectionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CardUpsertWithWhereUniqueWithoutCollectionInputSchema),z.lazy(() => CardUpsertWithWhereUniqueWithoutCollectionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyCollectionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CardUpdateWithWhereUniqueWithoutCollectionInputSchema),z.lazy(() => CardUpdateWithWhereUniqueWithoutCollectionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CardUpdateManyWithWhereWithoutCollectionInputSchema),z.lazy(() => CardUpdateManyWithWhereWithoutCollectionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CollectionCreateNestedOneWithoutCardsInputSchema: z.ZodType<Prisma.CollectionCreateNestedOneWithoutCardsInput> = z.object({
  create: z.union([ z.lazy(() => CollectionCreateWithoutCardsInputSchema),z.lazy(() => CollectionUncheckedCreateWithoutCardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CollectionCreateOrConnectWithoutCardsInputSchema).optional(),
  connect: z.lazy(() => CollectionWhereUniqueInputSchema).optional()
}).strict();

export const EnumBoxFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBoxFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BoxSchema).optional()
}).strict();

export const CollectionUpdateOneRequiredWithoutCardsNestedInputSchema: z.ZodType<Prisma.CollectionUpdateOneRequiredWithoutCardsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CollectionCreateWithoutCardsInputSchema),z.lazy(() => CollectionUncheckedCreateWithoutCardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CollectionCreateOrConnectWithoutCardsInputSchema).optional(),
  upsert: z.lazy(() => CollectionUpsertWithoutCardsInputSchema).optional(),
  connect: z.lazy(() => CollectionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CollectionUpdateToOneWithWhereWithoutCardsInputSchema),z.lazy(() => CollectionUpdateWithoutCardsInputSchema),z.lazy(() => CollectionUncheckedUpdateWithoutCardsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumBoxFilterSchema: z.ZodType<Prisma.NestedEnumBoxFilter> = z.object({
  equals: z.lazy(() => BoxSchema).optional(),
  in: z.lazy(() => BoxSchema).array().optional(),
  notIn: z.lazy(() => BoxSchema).array().optional(),
  not: z.union([ z.lazy(() => BoxSchema),z.lazy(() => NestedEnumBoxFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBoxWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBoxWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BoxSchema).optional(),
  in: z.lazy(() => BoxSchema).array().optional(),
  notIn: z.lazy(() => BoxSchema).array().optional(),
  not: z.union([ z.lazy(() => BoxSchema),z.lazy(() => NestedEnumBoxWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBoxFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBoxFilterSchema).optional()
}).strict();

export const CardCreateWithoutCollectionInputSchema: z.ZodType<Prisma.CardCreateWithoutCollectionInput> = z.object({
  id: z.string().cuid().optional(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }),
  answer: z.string().trim().min(1, { message: "The answer can't be empty" }),
  box: z.lazy(() => BoxSchema).optional()
}).strict();

export const CardUncheckedCreateWithoutCollectionInputSchema: z.ZodType<Prisma.CardUncheckedCreateWithoutCollectionInput> = z.object({
  id: z.string().cuid().optional(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }),
  answer: z.string().trim().min(1, { message: "The answer can't be empty" }),
  box: z.lazy(() => BoxSchema).optional()
}).strict();

export const CardCreateOrConnectWithoutCollectionInputSchema: z.ZodType<Prisma.CardCreateOrConnectWithoutCollectionInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CardCreateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema) ]),
}).strict();

export const CardCreateManyCollectionInputEnvelopeSchema: z.ZodType<Prisma.CardCreateManyCollectionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CardCreateManyCollectionInputSchema),z.lazy(() => CardCreateManyCollectionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CardUpsertWithWhereUniqueWithoutCollectionInputSchema: z.ZodType<Prisma.CardUpsertWithWhereUniqueWithoutCollectionInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CardUpdateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedUpdateWithoutCollectionInputSchema) ]),
  create: z.union([ z.lazy(() => CardCreateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedCreateWithoutCollectionInputSchema) ]),
}).strict();

export const CardUpdateWithWhereUniqueWithoutCollectionInputSchema: z.ZodType<Prisma.CardUpdateWithWhereUniqueWithoutCollectionInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CardUpdateWithoutCollectionInputSchema),z.lazy(() => CardUncheckedUpdateWithoutCollectionInputSchema) ]),
}).strict();

export const CardUpdateManyWithWhereWithoutCollectionInputSchema: z.ZodType<Prisma.CardUpdateManyWithWhereWithoutCollectionInput> = z.object({
  where: z.lazy(() => CardScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CardUpdateManyMutationInputSchema),z.lazy(() => CardUncheckedUpdateManyWithoutCollectionInputSchema) ]),
}).strict();

export const CardScalarWhereInputSchema: z.ZodType<Prisma.CardScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  collectionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  box: z.union([ z.lazy(() => EnumBoxFilterSchema),z.lazy(() => BoxSchema) ]).optional(),
}).strict();

export const CollectionCreateWithoutCardsInputSchema: z.ZodType<Prisma.CollectionCreateWithoutCardsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1, { message: "The name can't be empty" }),
  description: z.string().trim().optional().nullable(),
  userId: z.string()
}).strict();

export const CollectionUncheckedCreateWithoutCardsInputSchema: z.ZodType<Prisma.CollectionUncheckedCreateWithoutCardsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1, { message: "The name can't be empty" }),
  description: z.string().trim().optional().nullable(),
  userId: z.string()
}).strict();

export const CollectionCreateOrConnectWithoutCardsInputSchema: z.ZodType<Prisma.CollectionCreateOrConnectWithoutCardsInput> = z.object({
  where: z.lazy(() => CollectionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CollectionCreateWithoutCardsInputSchema),z.lazy(() => CollectionUncheckedCreateWithoutCardsInputSchema) ]),
}).strict();

export const CollectionUpsertWithoutCardsInputSchema: z.ZodType<Prisma.CollectionUpsertWithoutCardsInput> = z.object({
  update: z.union([ z.lazy(() => CollectionUpdateWithoutCardsInputSchema),z.lazy(() => CollectionUncheckedUpdateWithoutCardsInputSchema) ]),
  create: z.union([ z.lazy(() => CollectionCreateWithoutCardsInputSchema),z.lazy(() => CollectionUncheckedCreateWithoutCardsInputSchema) ]),
  where: z.lazy(() => CollectionWhereInputSchema).optional()
}).strict();

export const CollectionUpdateToOneWithWhereWithoutCardsInputSchema: z.ZodType<Prisma.CollectionUpdateToOneWithWhereWithoutCardsInput> = z.object({
  where: z.lazy(() => CollectionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CollectionUpdateWithoutCardsInputSchema),z.lazy(() => CollectionUncheckedUpdateWithoutCardsInputSchema) ]),
}).strict();

export const CollectionUpdateWithoutCardsInputSchema: z.ZodType<Prisma.CollectionUpdateWithoutCardsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1, { message: "The name can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().trim(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CollectionUncheckedUpdateWithoutCardsInputSchema: z.ZodType<Prisma.CollectionUncheckedUpdateWithoutCardsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1, { message: "The name can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().trim(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardCreateManyCollectionInputSchema: z.ZodType<Prisma.CardCreateManyCollectionInput> = z.object({
  id: z.string().cuid().optional(),
  question: z.string().trim().min(1, { message: "The question can't be empty" }),
  answer: z.string().trim().min(1, { message: "The answer can't be empty" }),
  box: z.lazy(() => BoxSchema).optional()
}).strict();

export const CardUpdateWithoutCollectionInputSchema: z.ZodType<Prisma.CardUpdateWithoutCollectionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string().trim().min(1, { message: "The question can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string().trim().min(1, { message: "The answer can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  box: z.union([ z.lazy(() => BoxSchema),z.lazy(() => EnumBoxFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUncheckedUpdateWithoutCollectionInputSchema: z.ZodType<Prisma.CardUncheckedUpdateWithoutCollectionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string().trim().min(1, { message: "The question can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string().trim().min(1, { message: "The answer can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  box: z.union([ z.lazy(() => BoxSchema),z.lazy(() => EnumBoxFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUncheckedUpdateManyWithoutCollectionInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyWithoutCollectionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string().trim().min(1, { message: "The question can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string().trim().min(1, { message: "The answer can't be empty" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  box: z.union([ z.lazy(() => BoxSchema),z.lazy(() => EnumBoxFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CollectionFindFirstArgsSchema: z.ZodType<Prisma.CollectionFindFirstArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  where: CollectionWhereInputSchema.optional(),
  orderBy: z.union([ CollectionOrderByWithRelationInputSchema.array(),CollectionOrderByWithRelationInputSchema ]).optional(),
  cursor: CollectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CollectionScalarFieldEnumSchema,CollectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CollectionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CollectionFindFirstOrThrowArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  where: CollectionWhereInputSchema.optional(),
  orderBy: z.union([ CollectionOrderByWithRelationInputSchema.array(),CollectionOrderByWithRelationInputSchema ]).optional(),
  cursor: CollectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CollectionScalarFieldEnumSchema,CollectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CollectionFindManyArgsSchema: z.ZodType<Prisma.CollectionFindManyArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  where: CollectionWhereInputSchema.optional(),
  orderBy: z.union([ CollectionOrderByWithRelationInputSchema.array(),CollectionOrderByWithRelationInputSchema ]).optional(),
  cursor: CollectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CollectionScalarFieldEnumSchema,CollectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CollectionAggregateArgsSchema: z.ZodType<Prisma.CollectionAggregateArgs> = z.object({
  where: CollectionWhereInputSchema.optional(),
  orderBy: z.union([ CollectionOrderByWithRelationInputSchema.array(),CollectionOrderByWithRelationInputSchema ]).optional(),
  cursor: CollectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CollectionGroupByArgsSchema: z.ZodType<Prisma.CollectionGroupByArgs> = z.object({
  where: CollectionWhereInputSchema.optional(),
  orderBy: z.union([ CollectionOrderByWithAggregationInputSchema.array(),CollectionOrderByWithAggregationInputSchema ]).optional(),
  by: CollectionScalarFieldEnumSchema.array(),
  having: CollectionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CollectionFindUniqueArgsSchema: z.ZodType<Prisma.CollectionFindUniqueArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  where: CollectionWhereUniqueInputSchema,
}).strict() ;

export const CollectionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CollectionFindUniqueOrThrowArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  where: CollectionWhereUniqueInputSchema,
}).strict() ;

export const CardFindFirstArgsSchema: z.ZodType<Prisma.CardFindFirstArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CardFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CardFindFirstOrThrowArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CardFindManyArgsSchema: z.ZodType<Prisma.CardFindManyArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CardAggregateArgsSchema: z.ZodType<Prisma.CardAggregateArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CardGroupByArgsSchema: z.ZodType<Prisma.CardGroupByArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithAggregationInputSchema.array(),CardOrderByWithAggregationInputSchema ]).optional(),
  by: CardScalarFieldEnumSchema.array(),
  having: CardScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CardFindUniqueArgsSchema: z.ZodType<Prisma.CardFindUniqueArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const CardFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CardFindUniqueOrThrowArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const CollectionCreateArgsSchema: z.ZodType<Prisma.CollectionCreateArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  data: z.union([ CollectionCreateInputSchema,CollectionUncheckedCreateInputSchema ]),
}).strict() ;

export const CollectionUpsertArgsSchema: z.ZodType<Prisma.CollectionUpsertArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  where: CollectionWhereUniqueInputSchema,
  create: z.union([ CollectionCreateInputSchema,CollectionUncheckedCreateInputSchema ]),
  update: z.union([ CollectionUpdateInputSchema,CollectionUncheckedUpdateInputSchema ]),
}).strict() ;

export const CollectionCreateManyArgsSchema: z.ZodType<Prisma.CollectionCreateManyArgs> = z.object({
  data: z.union([ CollectionCreateManyInputSchema,CollectionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CollectionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CollectionCreateManyAndReturnArgs> = z.object({
  data: z.union([ CollectionCreateManyInputSchema,CollectionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CollectionDeleteArgsSchema: z.ZodType<Prisma.CollectionDeleteArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  where: CollectionWhereUniqueInputSchema,
}).strict() ;

export const CollectionUpdateArgsSchema: z.ZodType<Prisma.CollectionUpdateArgs> = z.object({
  select: CollectionSelectSchema.optional(),
  include: CollectionIncludeSchema.optional(),
  data: z.union([ CollectionUpdateInputSchema,CollectionUncheckedUpdateInputSchema ]),
  where: CollectionWhereUniqueInputSchema,
}).strict() ;

export const CollectionUpdateManyArgsSchema: z.ZodType<Prisma.CollectionUpdateManyArgs> = z.object({
  data: z.union([ CollectionUpdateManyMutationInputSchema,CollectionUncheckedUpdateManyInputSchema ]),
  where: CollectionWhereInputSchema.optional(),
}).strict() ;

export const CollectionDeleteManyArgsSchema: z.ZodType<Prisma.CollectionDeleteManyArgs> = z.object({
  where: CollectionWhereInputSchema.optional(),
}).strict() ;

export const CardCreateArgsSchema: z.ZodType<Prisma.CardCreateArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  data: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
}).strict() ;

export const CardUpsertArgsSchema: z.ZodType<Prisma.CardUpsertArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
  create: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
  update: z.union([ CardUpdateInputSchema,CardUncheckedUpdateInputSchema ]),
}).strict() ;

export const CardCreateManyArgsSchema: z.ZodType<Prisma.CardCreateManyArgs> = z.object({
  data: z.union([ CardCreateManyInputSchema,CardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CardCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CardCreateManyAndReturnArgs> = z.object({
  data: z.union([ CardCreateManyInputSchema,CardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CardDeleteArgsSchema: z.ZodType<Prisma.CardDeleteArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const CardUpdateArgsSchema: z.ZodType<Prisma.CardUpdateArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  data: z.union([ CardUpdateInputSchema,CardUncheckedUpdateInputSchema ]),
  where: CardWhereUniqueInputSchema,
}).strict() ;

export const CardUpdateManyArgsSchema: z.ZodType<Prisma.CardUpdateManyArgs> = z.object({
  data: z.union([ CardUpdateManyMutationInputSchema,CardUncheckedUpdateManyInputSchema ]),
  where: CardWhereInputSchema.optional(),
}).strict() ;

export const CardDeleteManyArgsSchema: z.ZodType<Prisma.CardDeleteManyArgs> = z.object({
  where: CardWhereInputSchema.optional(),
}).strict() ;