/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

export type BaseTypes = 'Uri' | 'DocumentUri' | 'integer' | 'uinteger' | 'decimal' | 'RegExp' | 'string' | 'boolean' | 'null';

export type TypeKind = 'base' | 'reference' | 'array' | 'map' | 'and' | 'or' | 'tuple' | 'literal' | 'stringLiteral' | 'numberLiteral' | 'booleanLiteral';

export type Type = {
	kind: TypeKind;
} & ({
	/**
	 * Represents a base type like `string` or `DocumentUri`
	 */
	kind: 'base';
	name: BaseTypes;
} | {
	/**
	 * Represents a reference to another type (e.g. `TextDocument`)
	 */
	kind: 'reference';
	name: string;
} | {
	/**
	 * Represents an array type (e.g. `TextDocument[]`)
	 */
	kind: 'array';
	element: Type;
} | {
	/**
	 * Represents a JSON object map.
	 * (e.g. `interface Map<K extends string | number, V> { [key: K] => V; }`)
	 */
	kind: 'map';
	key: Type;
	value: Type;
} | {
	/**
	 * Represents an `and`, `or` or `tuple` type
	 * - and: `TextDocumentParams & WorkDoneProgressParams`
	 * - or: `Location | LocationLink`
	 * - tuple: `[integer, integer]`
	 */
	kind: 'and' | 'or' | 'tuple';
	items: Type[];
} | {
	/**
	 * Represents a literal structure
	 * (e.g. `property: { start: uinteger; end: uinteger; })`
	 */
	kind: 'literal';
	value: StructureLiteral;
} | {
	/**
	 * Represents a string literal type
	 * (e.g. `kind: 'rename'`)
	 */
	kind: 'stringLiteral';
	value: string;
} | {
	/**
	 * Represents a number literal type
	 * (e.g. `kind: 1`)
	 */
	kind: 'numberLiteral';
	value: number;
} | {
	/**
	 * Represents a boolean literal type
	 * (e.g. `kind: true`)
	 */
	kind: 'booleanLiteral';
	value: boolean;
});

/**
 * Represents a LSP request
 */
export type Request = {
	/**
	 * The request's method name.
	 */
	method: string;

	/**
	 * The parameter type(s) if any.
	 */
	params?: Type | Type[];

	/**
	 * The result type.
	 */
	result: Type;

	/**
	 * Optional partial result type if the request
	 * support partial result reporting.
	 */
	partialResult?: Type;

	/**
	 * An optional error data type;
	 */
	errorData?: Type;

	/**
	 * Optional registration options if the request
	 * support dynamic registration.
	 */
	registrationOptions?: Type;
};

/**
 * Represents a LSP notification
 */
export type Notification = {
	/**
	 * The request's method name.
	 */
	method: string;

	/**
	 * The parameter type(s) if any.
	 */
	params?: Type | Type[];

	/**
	 * Optional registration options if the notification
	 * support dynamic registration.
	 */
	registrationOptions?: Type;
};

/**
 * Represents an object property.
 */
export type Property = {
	/**
	 * The property name;
	 */
	name: string;

	/**
	 * An optional documentation;
	 */
	documentation?: string;

	/**
	 * The type of the property
	 */
	type: Type;

	/**
	 * Whether the property is optional. If
	 * omitted the property is mandatory.
	 */
	optional?: boolean;
};

/**
 * Defines the structure of an object literal.
 */
export type Structure = {
	/**
	 * The name of the structure
	 */
	name: string;

	/**
	 * An optional documentation;
	 */
	documentation?: string;

	/**
	 * Structures extended from
	 */
	extends?: Type[];

	/**
	 * Structures to mix in.
	 */
	mixins?: Type[];

	/**
	 * The Properties
	 */
	properties: Property[];
};

/**
 * Defines a unnamed structure of an object literal.
 */
export type StructureLiteral = {

	/**
	 * An optional documentation;
	 */
	documentation?: string;

	/**
	 * The Properties
	 */
	properties: Property[];
};

/**
 * Defines a type alias.
 * (e.g. `type Definition = Location | LocationLink`)
 */
export type TypeAlias = {
	/**
	 * The name of the type alias
	 */
	name: string;

	/**
	 * The aliased type
	 */
	type: Type;
};

/**
 * The actual meta model.
 */
export type MetaModel = {
	/**
	 * The requests.
	 */
	requests: Request[];

	/**
	 * The notifications.
	 */
	notifications: Notification[];

	/**
	 * The structures
	 */
	structures: Structure[];

	/**
	 * The type aliases
	 */
	typeAliases: TypeAlias[];
};