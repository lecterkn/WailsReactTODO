export namespace input {
	
	export class TaskCreateInput {
	    Title: string;
	
	    static createFrom(source: any = {}) {
	        return new TaskCreateInput(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Title = source["Title"];
	    }
	}
	export class TaskUpdateInput {
	    Title: string;
	
	    static createFrom(source: any = {}) {
	        return new TaskUpdateInput(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Title = source["Title"];
	    }
	}

}

export namespace output {
	
	export class SettingsOutput {
	    isDarkTheme: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SettingsOutput(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.isDarkTheme = source["isDarkTheme"];
	    }
	}
	export class TaskOutput {
	    Id: string;
	    Title: string;
	    Completed: boolean;
	    CreatedAt: string;
	    UpdatedAt: string;
	
	    static createFrom(source: any = {}) {
	        return new TaskOutput(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Title = source["Title"];
	        this.Completed = source["Completed"];
	        this.CreatedAt = source["CreatedAt"];
	        this.UpdatedAt = source["UpdatedAt"];
	    }
	}

}

