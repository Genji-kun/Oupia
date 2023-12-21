package com.pn.oupia.enums;

public enum GenderEnum {
    MALE("Nam"),
    FEMALE ("Nữ"),
    OTHER ("Khác");

    private final String displayName;

    private GenderEnum(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
