export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Accessibility {
  Compliant = 'compliant',
  NonCompliant = 'non_compliant',
  PartiallyCompliant = 'partially_compliant',
  Unknown = 'unknown'
}

export type AuthInput = {
  provider: AuthProvider;
  token: Scalars['String']['input'];
};

export enum AuthProvider {
  Facebook = 'facebook',
  Google = 'google'
}

export enum Category {
  Drinks = 'drinks',
  Food = 'food',
  Groceries = 'groceries',
  Health = 'health',
  Hotels = 'hotels',
  Shopping = 'shopping',
  Sites = 'sites',
  Transport = 'transport'
}

export type Feature = {
  __typename?: 'Feature';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type FeatureAvailabilityInput = {
  available: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type FeatureInput = {
  name: Scalars['String']['input'];
};

export type LocationInput = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: Scalars['String']['output'];
  /** Admin only */
  createFeature: Scalars['ID']['output'];
  /** Admin and Owner only */
  createPlace: Scalars['ID']['output'];
  /** Admin only */
  deleteFeature: Scalars['Boolean']['output'];
  /** Admin and Owner only */
  deletePlace: Scalars['Boolean']['output'];
  /** Admin only */
  deleteUser: Scalars['Boolean']['output'];
  /** Admin only */
  updateFeature: Scalars['ID']['output'];
  /** Admin and Owner only */
  updatePlace: Scalars['ID']['output'];
  /** Admin and Manager only */
  updatePlaceAccessibility: Accessibility;
  /** Admin and Manager only */
  updatePlaceFeatures: Scalars['Boolean']['output'];
  /** Admin only */
  updatePlaceOwner: Scalars['ID']['output'];
  /** Admin and Me only */
  updateUser: Scalars['ID']['output'];
  /** Admin only */
  updateUserRole: UserRole;
};


export type MutationAuthArgs = {
  input: AuthInput;
};


export type MutationCreateFeatureArgs = {
  input: FeatureInput;
};


export type MutationCreatePlaceArgs = {
  input: PlaceInput;
  userId: Scalars['ID']['input'];
};


export type MutationDeleteFeatureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePlaceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateFeatureArgs = {
  id: Scalars['ID']['input'];
  input: FeatureInput;
};


export type MutationUpdatePlaceArgs = {
  id: Scalars['ID']['input'];
  input: PlaceInput;
};


export type MutationUpdatePlaceAccessibilityArgs = {
  accessibility: Accessibility;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePlaceFeaturesArgs = {
  id: Scalars['ID']['input'];
  input: Array<FeatureAvailabilityInput>;
};


export type MutationUpdatePlaceOwnerArgs = {
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UserInput;
};


export type MutationUpdateUserRoleArgs = {
  id: Scalars['ID']['input'];
  role: UserRole;
};

export type Place = {
  __typename?: 'Place';
  accessibility: Accessibility;
  address: Scalars['String']['output'];
  availableFeatures: Array<Feature>;
  category: Category;
  description?: Maybe<Scalars['String']['output']>;
  featuresCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  /** Admin and Manager only */
  owner: User;
  unavailableFeatures: Array<Feature>;
};

export type PlaceInput = {
  category: Category;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  features: Array<Feature>;
  place?: Maybe<Place>;
  /** Admin and Manager only */
  places: Array<Place>;
  placesByLocation: Array<Place>;
  /** Admin, Manager and Me only */
  user?: Maybe<User>;
  /** Admin and Manager only */
  users: Array<User>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlacesByLocationArgs = {
  input: LocationInput;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  places: Array<Place>;
  role: UserRole;
};

export type UserInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user'
}
