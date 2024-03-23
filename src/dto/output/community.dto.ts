export interface Community {
	id: string;
	ownerId: string;
	private: boolean;
	premium: boolean;
	name?: string;
	image?: string;
	description?: string;
	longDescription?: string;
	members?: number;
}
