/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Category {
  Default = 'Default',
  Light = 'Light',
  Sensor = 'Sensor'
}

export type Device = {
  __typename?: 'Device';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Group>>>;
  mqttTopic?: Maybe<Scalars['String']>;
  gateway?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  fn?: Maybe<Functions>;
};

export type Functions = {
  __typename?: 'Functions';
  power?: Maybe<Power>;
  dim?: Maybe<Scalars['String']>;
  sensor?: Maybe<Sensor>;
};

export type Group = {
  __typename?: 'Group';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  devices?: Maybe<Array<Maybe<Device>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDevice?: Maybe<Device>;
  changeState?: Maybe<Device>;
  handleMqttPublish?: Maybe<Scalars['Boolean']>;
  addDeviceToGroup?: Maybe<Group>;
  addDeviceToCategory?: Maybe<Scalars['Boolean']>;
  addGroup?: Maybe<Group>;
  removeGroup?: Maybe<Group>;
};


export type MutationAddDeviceArgs = {
  name: Scalars['String'];
  mqttTopic: Scalars['String'];
};


export type MutationChangeStateArgs = {
  id: Scalars['String'];
  fn: Scalars['String'];
  state: PowerState;
};


export type MutationHandleMqttPublishArgs = {
  topic: Scalars['String'];
  payload: Scalars['String'];
};


export type MutationAddDeviceToGroupArgs = {
  groupId: Scalars['String'];
  deviceId: Scalars['String'];
};


export type MutationAddDeviceToCategoryArgs = {
  category: Category;
  deviceId: Scalars['String'];
};


export type MutationAddGroupArgs = {
  name: Scalars['String'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['ID'];
};

export type Power = {
  __typename?: 'Power';
  relay1?: Maybe<PowerState>;
  relay2?: Maybe<PowerState>;
  relay3?: Maybe<PowerState>;
};

export enum PowerState {
  On = 'ON',
  Off = 'OFF'
}

export type Query = {
  __typename?: 'Query';
  devices?: Maybe<Array<Maybe<Device>>>;
  device?: Maybe<Device>;
  getDevicesOfCategory?: Maybe<Array<Maybe<Device>>>;
  groups?: Maybe<Array<Maybe<Group>>>;
  group?: Maybe<Group>;
};


export type QueryDeviceArgs = {
  id: Scalars['String'];
};


export type QueryGetDevicesOfCategoryArgs = {
  category: Category;
};


export type QueryGroupArgs = {
  id: Scalars['String'];
};

export type Sensor = {
  __typename?: 'Sensor';
  sensor1?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  device?: Maybe<Device>;
};
