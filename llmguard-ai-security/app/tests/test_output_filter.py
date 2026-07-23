from app.security.output_filter import filter_output


def test_filter_sensitive_data():
    response = "My API key is abc123"

    result = filter_output(response)

    assert result["is_safe"] is False
    assert "api[_\\s]?key" in result["detected_patterns"]
    assert "[REDACTED]" in result["filtered_output"]


def test_safe_output():
    response = "Hello, how are you?"

    result = filter_output(response)

    assert result["is_safe"] is True
    assert result["detected_patterns"] == []
    assert result["filtered_output"] == response