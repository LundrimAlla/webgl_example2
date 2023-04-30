class ShaderProgram {
    constructor(vertexId, fragmentId, shaderInfo) {
        // Create shader program using the provided vertex and fragment shader ids
        this.program = createShaderProgram(vertexId, fragmentId);
        gl.useProgram(this.program);

        this.attributes = {}
        this.uniforms = {};

        // Extract attribute and uniform information fromm the shaderInfo object
        // and look up their locations
        Object.entries(shaderInfo.attributes).forEach(([key, value]) => {
            this.attributes[key] = gl.getAttribLocation(this.program, value);
        })

        Object.entries(shaderInfo.uniforms).forEach(([key, value]) => {
            this.uniforms[key] = gl.getUniformLocation(this.program, value);
        })

        // Send projection and view matrix
        // You will need to send the view matrix at a different location in your application, probably somewhere within the render loop!
        gl.uniformMatrix4fv(this.uniforms.projectionMatrix, gl.FALSE, matrices.projectionMatrix);
        gl.uniformMatrix4fv(this.uniforms.viewMatrix, gl.FALSE, matrices.viewMatrix);
    }

    enable() {
        currentShaderProgram = this;
        gl.useProgram(this.program);
    }
}